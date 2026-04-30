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

    console.log("Fetched products data:", data);
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

export async function getProductsFromCategory(
  category: string,
): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?category=${category}`, {
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

let categoryMap: Record<string, number> | null = null;

export async function getCategoryMap() {
  // Return cached map if available
  if (categoryMap) {
    return categoryMap;
  }

  // Fetch categories from WooCommerce API
  const res = await fetch(
    `${BASE_URL}/products/categories?per_page=100`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = await res.json();

  // Build the map: { slug: id }
  categoryMap = {};
  categories.forEach((cat: { slug: string; id: number }) => {
    categoryMap![cat.slug] = cat.id;
  });
console.log("Fetched category map:", categoryMap);
  return categoryMap;
}

export async function getProductsByCategorySlugs(slugs: string[]) {
  const map = await getCategoryMap();
  const ids = slugs.map((slug) => map[slug]).filter(Boolean);

  // Fetch products by IDs
  const res = await fetch(
    `${BASE_URL}/products?category=${ids.join(",")}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products for categories");
  }

  const products = await res.json();
  console.log("Fetched products by category slugs:", products);
  return products.map(mapProduct);
}
