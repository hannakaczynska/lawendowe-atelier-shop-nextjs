import { NextResponse } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader
      ?.split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 },
      );
    }

    // Validate token with WordPress
    const validateRes = await fetch(
      `${BASE_URL}/wp-json/jwt-auth/v1/token/validate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const validateData = await validateRes.json();
    console.log("Token validation response:", validateData);

    if (!validateRes.ok || validateData?.data?.status !== 200) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 },
      );
    }

    // Token is valid → fetch user info
    const userRes = await fetch(`${BASE_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userRes.ok) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
    }

    const user = await userRes.json();

    return NextResponse.json(
      {
        authenticated: true,
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 },
    );
  }
}
