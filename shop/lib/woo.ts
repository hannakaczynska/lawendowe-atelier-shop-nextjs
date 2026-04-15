const BASE_URL = "http://lawendowe-atelier-backend.local/wp-json/wc/store";

export async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    console.log("Fetched products successfully", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// const res = await fetch(`${BASE_URL}/products?slug=${slug}`);

export async function getProduct(slug: string) {
    console.log(`Fetching product with slug: ${slug}`);
  try {
    const res = await fetch(`${BASE_URL}/products/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await res.json();
    console.log("Fetched product successfully", data);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}