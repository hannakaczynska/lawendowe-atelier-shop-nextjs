import ProductList from "@/components/shop/ProductList";
import SidePanel from "@/components/shop/SidePanel/SidePanel";
import CategoryPanel from "@/components/shop/CategoryPanel";
import { getProductsByCategorySlugs } from "@/lib/woo";
import { getCategoryMap } from "@/lib/wooCategoryMapper";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { categoryTree, firstLevelSlugs } = await getCategoryMap();
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const slugs = decoded.split(",").filter(Boolean);

  const products = await getProductsByCategorySlugs(slugs);
  return (
    <div>
      <CategoryPanel />
      <div className="flex max-w-[1500px] mx-auto px-4 py-8">
        <div className="hidden md:block md:w-[250px] lg:w-[300px] shrink-0">
          <SidePanel
            categoryTree={categoryTree}
            firstLevelSlugs={firstLevelSlugs}
          />
        </div>
        <div className="flex-1">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
