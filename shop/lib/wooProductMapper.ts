import type { WooStoreProduct } from "@/types/woo";
import type { Product } from "@/types/product";

export function mapProduct(p: WooStoreProduct): Product {
  const image = p.images?.[0];

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    shortDescription: p.short_description ?? "",
    description: p.description ?? "",

    price: Number(p.price),
    regularPrice: Number(p.regular_price),
    salePrice: Number(p.sale_price),

    mainImage: {
      src: image?.src ?? "/product-placeholder.png",
      alt: image?.alt ?? p.name,
    },

    images: p.images?.map((img) => ({
      src: img.src,
      alt: img.alt ?? p.name,
    })) ?? [],

    inStock: p.stock_status,
    quantity: p.stock_quantity ?? 0,

    categories:
      p.categories?.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      })) ?? [],
  };
}