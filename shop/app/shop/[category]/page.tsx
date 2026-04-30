import ProductList from "@/components/shop/ProductList";
import SidePanel from "@/components/shop/SidePanel";
import CategoryPanel from "@/components/shop/CategoryPanel";
import { getProductsByCategorySlugs } from "@/lib/woo";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
  const products = await getProductsByCategorySlugs([category]);
  return (
    <div>
      <CategoryPanel />
      <div className="flex">
        <SidePanel />
        <ProductList products={products} />
      </div>
    </div>
  );
}
