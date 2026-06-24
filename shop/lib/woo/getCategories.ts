export async function getCategories() {
  const BASE_URL = process.env.WOOCOMMERCE_URL;
  const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!BASE_URL || !CK || !CS) {
    console.error("Missing WooCommerce env variables");
    return [];
  }

  const params = new URLSearchParams({
    consumer_key: CK,
    consumer_secret: CS,
    per_page: "100",
  });

  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products/categories?${params}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch categories from WooCommerce:",
        res.status
      );
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}