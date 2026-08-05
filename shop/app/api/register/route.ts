import { NextResponse } from "next/server";
import crypto from "crypto";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const WP_ADMIN_USER = process.env.WP_ADMIN_USER;
const WP_ADMIN_PASS = process.env.WP_ADMIN_PASSWORD;
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;

export async function POST(req: Request) {
  try {
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
      return NextResponse.json(
        { message: "Wersja demonstracyjna — rejestracja jest wyłączona." },
        { status: 403 },
      );
    }
    const body = await req.json();

    if (!body.hcaptcha) {
      return NextResponse.json(
        { message: "Brak tokenu hCaptcha" },
        { status: 400 },
      );
    }

    // verify hCaptcha response
    const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${HCAPTCHA_SECRET}&response=${body.hcaptcha}`,
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { message: "Niepoprawna weryfikacja hCaptcha" },
        { status: 400 },
      );
    }

    // Validate password strength
    if (!body.password || body.password.length < 8) {
      return NextResponse.json(
        { message: "Hasło musi mieć co najmniej 8 znaków" },
        { status: 400 },
      );
    }

    const hasLower = /[a-z]/.test(body.password);
    const hasUpper = /[A-Z]/.test(body.password);
    const hasDigit = /[0-9]/.test(body.password);

    if (!hasLower || !hasUpper || !hasDigit) {
      return NextResponse.json(
        { message: "Hasło musi zawierać małą literę, dużą literę i cyfrę" },
        { status: 400 },
      );
    }

    // fetch token for admin user
    const tokenRes = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: WP_ADMIN_USER,
        password: WP_ADMIN_PASS,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.token) {
      return NextResponse.json(
        { message: "Błąd autoryzacji admina", details: tokenData },
        { status: 500 },
      );
    }

    const adminToken = tokenData.token;
    const token = crypto.randomUUID();

    // create new user with admin token
    const userRes = await fetch(`${BASE_URL}/wp-json/wp/v2/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        username: body.email,
        email: body.email,
        password: body.password,
        first_name: body.firstName,
        last_name: body.lastName,
        meta: {
          email_verified: false,
          email_verification_token: token,
          email_verification_token_expires: Date.now() + 30 * 60 * 1000, // 30 minutes expiry
          consent_regulations: body.consent_regulations,
          consent_marketing: body.consent_marketing,
          shipping_same_as_billing: true,
        },
      }),
    });

    const userData = await userRes.json();

    if (!userRes.ok) {
      if (
        userData.code === "existing_user_email" ||
        userData.code === "existing_user_login"
      ) {
        return NextResponse.json({ success: true });
      }

      return NextResponse.json(
        { success: false, message: "Nie udało się utworzyć konta" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił błąd serwera", details: String(error) },
      { status: 500 },
    );
  }
}
