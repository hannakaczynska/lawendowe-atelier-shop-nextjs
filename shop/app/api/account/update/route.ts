import { NextResponse } from "next/server";
import { verifyUserToken } from "@/app/api/_utils/auth/verifyUser";
import { mapFormToWoo, mapFields} from "@/lib/wooAccountMapper";
import { AccountFormData } from "@/types/account";
import {
  billingFields,
  shippingFields,
  wooFields,
} from "@/config/accountFields";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function POST(req: Request) {
  try {
    const { ok, token } = await verifyUserToken(req);

    if (!ok || !token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //fetch WordPress user data
    const wpRes = await fetch(
      `${BASE_URL}/wp-json/wp/v2/users/me?context=edit`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!wpRes.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wpUser = await wpRes.json();

    //fetch WooCommerce customer data
    const wcRes = await fetch(
      `${BASE_URL}/wp-json/wc/v3/customers/${wpUser.id}?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`,
    );

    if (!wcRes.ok) {
      const err = await wcRes.text();
      return NextResponse.json(
        { error: "WooCommerce fetch error", details: err },
        { status: 400 },
      );
    }

    const wcUser = await wcRes.json();

    // fetch current form data from request body
    const currentForm: AccountFormData = await req.json();

    if (!currentForm) {
      return NextResponse.json(
        { error: "No form data provided" },
        { status: 400 },
      );
    }

    const billingChanged = billingFields.some(
      (field) => currentForm[field] !== "",
    );

    const shippingChanged = shippingFields.some(
      (field) => currentForm[field] !== "",
    );

    const isAccountMode = billingChanged && shippingChanged;

    let payload;

    if (!isAccountMode) {
      const finalBilling = billingChanged
        ? {
          ...mapFields("billing", currentForm),
          email: currentForm.billingEmail,
          }
        : wcUser.billing;

      const finalShipping = shippingChanged
        ? {
            ...mapFields("shipping", currentForm),
          }
        : wcUser.shipping;

      const shippingSameAsBilling = wooFields.every(
        (field) => finalBilling[field] === finalShipping[field],
      );

      payload = {
        first_name: wcUser.first_name,
        last_name: wcUser.last_name,
        email: wcUser.email,
        billing: finalBilling,
        shipping: finalShipping,
        meta_data: [
          {
            key: "shipping_same_as_billing",
            value: shippingSameAsBilling ? "1" : "0",
          },
        ],
      };
    } else {
      const finalData = mapFormToWoo(currentForm);
      const shippingSameAsBilling = wooFields.every(
        (field) => finalData.billing[field] === finalData.shipping[field],
      );

      payload = {
        first_name: wcUser.first_name,
        last_name: wcUser.last_name,
        email: wcUser.email,
        billing: finalData.billing,
        shipping: finalData.shipping,
        meta_data: [
          {
            key: "shipping_same_as_billing",
            value: shippingSameAsBilling ? "1" : "0",
          },
        ],
      };
    }

    console.log("Payload to send to WooCommerce:", payload);
    const wooRes = await fetch(
      `${BASE_URL}/wp-json/wc/v3/customers/${wpUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!wooRes.ok) {
      const err = await wooRes.text();
      return NextResponse.json(
        { error: "WooCommerce error", details: err },
        { status: 400 },
      );
    }

    const updated = await wooRes.json();

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 },
    );
  }
}
