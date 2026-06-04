import { NextResponse, NextRequest } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// GET /api/products/by-category?category=1,2,3
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  if (!category) {
    return NextResponse.json(
      { error: "Missing required query param: category" },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    consumer_key: CK ?? "",
    consumer_secret: CS ?? "",
    category,
  });

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products?${params}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products from WooCommerce" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 },
    );
  }
}
