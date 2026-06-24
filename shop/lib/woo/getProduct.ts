import { WooStoreProduct } from "@/types/woo";
import { Product } from "@/types/product";
import { mapProduct } from "@/lib/wooProductMapper";

export async function getProduct(slug: string): Promise<Product | null> {
  const BASE_URL = process.env.WOOCOMMERCE_URL;
  const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!BASE_URL || !CK || !CS) {
    console.error("Missing WooCommerce env variables");
    return null;
  }

  const params = new URLSearchParams({
    consumer_key: CK,
    consumer_secret: CS,
    slug,
  });

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products?${params}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch product:", res.status);
      return null;
    }

    const data: WooStoreProduct[] = await res.json();

    const product = data?.[0];

    if (!product) {
      console.warn("Product not found for slug:", slug);
      return null;
    }

    return mapProduct(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}