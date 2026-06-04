import { NextResponse, NextRequest } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// GET /api/categories?per_page=100
export async function GET(request: NextRequest) {
  const perPage = request.nextUrl.searchParams.get("per_page") ?? "100";

  const params = new URLSearchParams({
    consumer_key: CK ?? "",
    consumer_secret: CS ?? "",
    per_page: perPage,
  });

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products/categories?${params}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch categories from WooCommerce" },
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
