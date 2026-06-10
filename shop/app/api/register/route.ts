import { NextResponse } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const WP_ADMIN_USER = process.env.WP_ADMIN_USER;
const WP_ADMIN_PASS = process.env.WP_ADMIN_PASSWORD;
console.log(WP_ADMIN_USER, WP_ADMIN_PASS);

export async function POST(req: Request) {
  try {

    const body = await req.json();

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
        { message: "Cannot authenticate admin", details: tokenData },
        { status: 500 }
      );
    }

    const adminToken = tokenData.token;

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
        meta: {
          first_name: body.firstName,
          last_name: body.lastName,
          phone: body.phone,
          consent_regulations: body.consent_regulations,
          consent_marketing: body.consent_marketing,
        },
      }),
    });

    const userData = await userRes.json();

    if (!userRes.ok) {
      return NextResponse.json(userData, { status: userRes.status });
    }

    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
