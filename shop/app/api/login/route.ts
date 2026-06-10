import { NextResponse } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json();

        if (!body.hcaptcha) {
      return NextResponse.json(
        { message: "Brak tokenu hCaptcha" },
        { status: 400 }
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
        { status: 400 }
      );
    }

    console.log("hCaptcha verification successful");

    //login in wordpress
    const wpRes = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: body.email,
        password: body.password,
      }),
    });

    const wpData  = await wpRes.json();

    if (!wpRes.ok || !wpData.token) {
      return NextResponse.json(
        { message: wpData.message || "Błędne dane logowania" },
        { status: 401 }
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
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
