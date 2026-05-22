import ProductList from "@/components/shop/ProductList";
import SidePanel from "@/components/shop/category/SidePanel/SidePanel";
import MobilePanel from "@/components/shop/category/MobilePanel";
import CategoryNavigation from "@/components/shop/category/CategoryNavigation";
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
    <>
      <div className="hidden md:block mt-[100px] w-screen h-[100px] bg-[url('/shop-header.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      </div>
      <div className="md:hidden max-w-[500px] mx-auto mt-[110px]">
      <CategoryNavigation slugs={slugs} categoryTree={categoryTree} />
      <MobilePanel categoryTree={categoryTree} />
      </div>
      <div className="flex max-w-[1500px] mx-auto px-4 py-1 my-6 md:py-8 md:mt-6">
        <div className="hidden md:block md:w-[250px] lg:w-[300px] shrink-0">
          <SidePanel
            categoryTree={categoryTree}
            firstLevelSlugs={firstLevelSlugs}
          />
        </div>
        <div className="flex-1">
          <ProductList products={products}/>
        </div>
      </div>
    </>
  );
}
