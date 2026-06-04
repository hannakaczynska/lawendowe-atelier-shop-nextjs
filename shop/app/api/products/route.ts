import { NextResponse } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function GET() {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products?consumer_key=${CK}&consumer_secret=${CS}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products from WooCommerce" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}