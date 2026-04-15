import ProductCard from "@/components/shop/ProductCard";
import { getProduct } from "@/lib/woo";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <ProductCard product={product} />;
}
