import ProductList from "@/components/shop/ProductList";
import SidePanel from "@/components/shop/SidePanel";
import CategoryPanel from "@/components/shop/CategoryPanel";
import { getProductsByCategorySlugs } from "@/lib/woo";
import { getCategoryMap } from "@/lib/wooCategoryMapper";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { categoryTree } = await getCategoryMap();
  const { category } = params;
  const products = await getProductsByCategorySlugs([category]);
  return (
    <div>
      <CategoryPanel />
      <div className="flex">
        <SidePanel categoryTree={categoryTree} />
        <ProductList products={products} />
      </div>
    </div>
  );
}
