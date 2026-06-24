import { WooStoreProduct } from "@/types/woo";
import { Product } from "@/types/product";
import { mapProduct } from "@/lib/wooProductMapper";

export async function getProducts(): Promise<Product[]> {
  const BASE_URL = process.env.WOOCOMMERCE_URL;
  const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!BASE_URL || !CK || !CS) {
    console.error("Missing WooCommerce env variables");
    return [];
  }

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products?consumer_key=${CK}&consumer_secret=${CS}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch products from WooCommerce");
      return [];
    }

    const data: WooStoreProduct[] = await res.json();

    return data.map(mapProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
