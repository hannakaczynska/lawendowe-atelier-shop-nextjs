import { NextResponse, NextRequest } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// GET /api/products/[slug]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const searchParams = new URLSearchParams({
    consumer_key: CK ?? "",
    consumer_secret: CS ?? "",
    slug,
  });

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products?${searchParams}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch product from WooCommerce" },
        { status: res.status },
      );
    }

    const data = await res.json();
    const product = data[0];

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 },
    );
  }
}
