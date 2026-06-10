import { NextResponse } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: body.email,
        password: body.password,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.token) {
      return NextResponse.json(
        { message: data.message || "Błędne dane logowania" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("auth_token", data.token, {
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
