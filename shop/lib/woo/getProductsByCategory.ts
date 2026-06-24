import { mapProduct } from "@/lib/wooProductMapper";
import { WooStoreProduct } from "@/types/woo";
import { getCategoryMap } from "@/lib/utils/category/wooCategoryMapper";

export async function getProductsByCategory(slugs: string[]) {
  const BASE_URL = process.env.WOOCOMMERCE_URL;
  const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!BASE_URL || !CK || !CS) {
    console.error("Missing WooCommerce env variables");
    return [];
  }

  const { categoryMap } = await getCategoryMap();

  const ids = slugs.map((slug) => categoryMap[slug]).filter(Boolean);

  if (ids.length === 0) {
    console.warn("No valid category IDs found for slugs:", slugs);
    return [];
  }

  const params = new URLSearchParams({
    consumer_key: CK,
    consumer_secret: CS,
    category: ids.join(","),
  });

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products?${params}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch products by category:", res.status);
      return [];
    }

    const data: WooStoreProduct[] = await res.json();

    return data.map(mapProduct);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}