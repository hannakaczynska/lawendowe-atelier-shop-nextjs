import { NextResponse } from "next/server";
import { verifyHcaptcha } from "@/app/api/_utils/hcaptcha/verifyHcaptcha";

const BASE_URL = process.env.WOOCOMMERCE_URL;

export async function POST(req: Request) {
  try {
    
    const body = await req.json();

    const hcaptcha = await verifyHcaptcha(body.hcaptcha);
    if (!hcaptcha.ok) {
      return NextResponse.json(
        { message: hcaptcha.message || "Niepoprawna weryfikacja hCaptcha" },
        { status: 400 },
      );
    }

    //login in wordpress
    const wpRes = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: body.email,
        password: body.password,
      }),
    });

    const wpData = await wpRes.json();

    if (!wpRes.ok || !wpData.token) {
      return NextResponse.json(
        { message: "Błędne dane logowania" },
        { status: 401 },
      );
    }

    // fetch user data to check email verification status
    const userRes = await fetch(
      `${BASE_URL}/wp-json/wp/v2/users/me?context=edit`,
      {
        headers: {
          Authorization: `Bearer ${wpData.token}`,
        },
      },
    );

    const userData = await userRes.json();

    if (!userRes.ok) {
      return NextResponse.json(
        { message: "Nie udało się pobrać danych użytkownika" },
        { status: 500 },
      );
    }

    // check if email is verified
    if (!userData.meta?.email_verified) {
      return NextResponse.json(
        { message: "Adres e-mail nie został zweryfikowany" },
        { status: 403 },
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("auth_token", wpData.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił błąd serwera", details: String(error) },
      { status: 500 },
    );
  }
}
