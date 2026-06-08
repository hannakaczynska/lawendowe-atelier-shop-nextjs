import ProductCard from "@/components/shop/ProductCard";
import { getProduct } from "@/lib/woo";
import CategoryNavigation from "@/components/shop/category/CategoryNavigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  console.log("Received params:", { category, slug });
  const product = await getProduct(slug);
  const decoded = decodeURIComponent(category);
  const slugs = decoded.split(",").filter(Boolean);

  return (
    <div className="max-w-[500px] mx-auto mt-[110px]">
      <CategoryNavigation slugs={slugs} productCard={true} productName={product.name} categories={product.categories} />
      <ProductCard product={product} />
    </div>
  );
}
