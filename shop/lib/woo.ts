import { WooStoreProduct } from "@/types/woo";
import { Product } from "@/types/product";
import { mapProduct } from "@/lib/wooProductMapper";
import { getCategoryMap } from "@/lib/utils/category/wooCategoryMapper";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${appUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: WooStoreProduct[] = await res.json();

    console.log("Fetched products from API route:", data);

    return data.map(mapProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProduct(slug: string): Promise<Product> {
  try {
    const res = await fetch(`${appUrl}/api/products/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data: WooStoreProduct = await res.json();
    console.log(`Fetched product for slug "${slug}":`, data);

    return mapProduct(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}


export async function getProductsByCategorySlugs(slugs: string[]) {
  const { categoryMap: map } = await getCategoryMap();

  const ids = slugs.map((slug) => map[slug]).filter(Boolean);

  const res = await fetch(
    `${appUrl}/api/products/by-category?category=${ids.join(",")}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products for categories");
  }

  const products = await res.json();
  console.log(`Fetched products for categories [${slugs.join(", ")}]:`, products);
  return products.map(mapProduct);
}
