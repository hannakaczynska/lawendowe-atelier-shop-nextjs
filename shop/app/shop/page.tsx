import ProductList from "@/components/shop/ProductList";
import SidePanel from "@/components/shop/category/SidePanel/SidePanel";
import CategoryNavigation from "@/components/shop/category/CategoryNavigation";
import MobilePanel from "@/components/shop/category/MobilePanel";
import { getCategoryMap } from "@/lib/wooCategoryMapper";
import { getProducts } from "@/lib/woo";


export default async function Shop() {
  const products = await getProducts();
  const { categoryTree, firstLevelSlugs } = await getCategoryMap();

  return (
    <div>
      <div className="hidden md:block w-screen h-[100px] bg-[url('/shop-header.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      </div>
      <CategoryNavigation slugs={["all"]} categoryTree={categoryTree} />
      <MobilePanel />
      <div className="flex max-w-[1500px] mx-auto px-4 py-1 my-6 md:py-8 md:mt-6">
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
