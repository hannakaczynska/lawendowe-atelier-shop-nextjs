import { NextResponse } from "next/server";
import { verifyUserToken } from "@/app/api/_utils/auth/verifyUser";

const BASE_URL = process.env.WOOCOMMERCE_URL;

export async function GET(req: Request) {
  try {
    const { ok, token } = await verifyUserToken(req);

    if (!ok || !token) {
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
        { status: 401 },
      );
    }

    const user = await userRes.json();

    return NextResponse.json(
      {
        authenticated: true,
        userId: user.id,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("api/me:", err);
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 },
    );
  }
}
