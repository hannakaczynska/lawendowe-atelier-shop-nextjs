import { WooStoreProduct } from "@/types/woo";
import { Product } from "@/types/product";
import { mapProduct } from "@/lib/wooProductMapper";
import { getCategoryMap } from "@/lib/utils/category/wooCategoryMapper";
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

    return mapProduct(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}


export async function getProductsByCategorySlugs(slugs: string[]) {
  const {categoryMap: map, categoryTree: tree} = await getCategoryMap();

  const ids = slugs.map((slug) => map[slug]).filter(Boolean);

  // Fetch products by IDs
  const res = await fetch(
    `${BASE_URL}/products?category=${ids.join(",")}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products for categories");
  }

  const products = await res.json();
  console.log(`Fetched products for categories [${slugs.join(", ")}]:`, products);
  return products.map(mapProduct);
}
