import { WooStoreProduct } from "@/types/woo";
import { Product } from "@/types/product";
import { mapProduct } from "@/lib/wooProductMapper";
const BASE_URL = "http://lawendowe-atelier-backend.local/wp-json/wc/store";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: WooStoreProduct[] = await res.json();

    
    return data.map(mapProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProduct(slug: string): Promise<Product> {
  console.log(`Fetching product with slug: ${slug}`);
  try {
    const res = await fetch(`${BASE_URL}/products/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data: WooStoreProduct = await res.json();
console.log("Fetched product data:", data);
    return mapProduct(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
