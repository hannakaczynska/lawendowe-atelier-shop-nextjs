import ProductCard from "@/components/shop/product/ProductCard";
import { getProduct } from "@/lib/woo";
import CategoryNavigation from "@/components/shop/category/CategoryNavigation";
import BackButton from "@/components/elements/BackButton";
import ProductRefferals from "@/components/shop/product/ProductRefferals";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = await getProduct(slug);
  console.log("Fetched product in page component:", product);
  const decoded = decodeURIComponent(category);
  const slugs = decoded.split(",").filter(Boolean);

  return (
    <div className="w-100% max-w-[500px] md:max-w-[700px] mx-auto mt-[110px] lg:max-w-[1500px]">
      <nav className="flex flex-col md:flex-row mb-8 py-4 px-4 gap-4 md:gap-15 ">
      <BackButton />
      <CategoryNavigation slugs={slugs} productCard={true} productName={product.name} categories={product.categories} />
      </nav>
      <ProductCard product={product} />
      <ProductRefferals />
    </div>
  );
}
