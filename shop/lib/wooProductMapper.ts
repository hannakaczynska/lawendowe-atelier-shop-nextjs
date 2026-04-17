import type { WooStoreProduct } from "@/types/woo";
import type { Product } from "@/types/product";

export function mapProduct(p: WooStoreProduct): Product {
  const image = p.images?.[0];

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,

    price: Number(p.prices.price),
    regularPrice: Number(p.prices.regular_price),
    salePrice: p.prices.sale_price
      ? Number(p.prices.sale_price)
      : undefined,

    currency: p.prices.currency_symbol,

    mainImage: {
      src: image?.src ?? "/product-placeholder.png",
      alt: image?.alt ?? p.name,
    },

    images: p.images?.map((img) => ({
      src: img.src,
      alt: img.alt ?? p.name,
    })) ?? [],

    inStock: p.is_in_stock,

    categories:
      p.categories?.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      })) ?? [],
  };
}