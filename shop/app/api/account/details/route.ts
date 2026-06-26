import { NextResponse } from "next/server";
import {verifyUserToken} from "@/app/api/_utils/auth/verifyUser";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function GET(req: Request) {
  try {
    const { ok, token } = await verifyUserToken(req);
  
    if (!ok || !token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get WordPress user data
    const wpRes = await fetch(`${BASE_URL}/wp-json/wp/v2/users/me?context=edit`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!wpRes.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wpUser = await wpRes.json();

    console.log("Pobrane dane użytkownika z WordPress:", wpUser);
    // 3. Get WooCommerce customer data
    const wcRes = await fetch(
      `${BASE_URL}/wp-json/wc/v3/customers/${wpUser.id}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`
    );

    const wcUser = await wcRes.json();
    console.log("Pobrane dane użytkownika z WooCommerce:", wcUser);

      // 4. Merge both
    return NextResponse.json(
      {
        id: wpUser.id,
        email: wpUser.email,
        firstName: wpUser.first_name,
        lastName: wpUser.last_name,
        shippingSameAsBilling: wpUser.meta.shipping_same_as_billing,

        billing: wcUser.billing,
        shipping: wcUser.shipping,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
