import { NextResponse } from "next/server";
import { mapFormToWoo } from "@/lib/wooAccountMapper";
import { AccountFormData } from "@/types/account";
import {verifyUserToken} from "@/app/api/_utils/auth/verifyUser";

const BASE_URL = process.env.WOOCOMMERCE_URL;

export async function POST(req: Request) {
  try {
    const { ok, token } = await verifyUserToken(req);

    if (!ok || !token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const wpUserRes = await fetch(`${BASE_URL}/wp-json/wp/v2/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!wpUserRes.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wpUser = await wpUserRes.json();
    const userId = wpUser.id;

    const body: AccountFormData = await req.json();

    const wooPayload = mapFormToWoo(body);

    const wooRes = await fetch(
      `${BASE_URL}/wp-json/wc/v3/customers/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(wooPayload),
      }
    );

    if (!wooRes.ok) {
      const err = await wooRes.text();
      return NextResponse.json(
        { error: "WooCommerce error", details: err },
        { status: 400 }
      );
    }

    const updated = await wooRes.json();

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
