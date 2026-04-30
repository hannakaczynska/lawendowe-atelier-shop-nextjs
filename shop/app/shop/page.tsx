import ProductList from "@/components/shop/ProductList";
import SidePanel from "@/components/shop/SidePanel";
import CategoryPanel from "@/components/shop/CategoryPanel";
import { getCategoryMap } from "@/lib/wooCategoryMapper";
import { getProducts } from "@/lib/woo";

export default async function Shop() {
  const products = await getProducts();
    const { categoryTree } = await getCategoryMap();
  return (
    <div>
      <CategoryPanel />
      <div className="flex max-w-[1500px] mx-auto px-4 py-8">
        <div className="hidden lg:block w-[300px] shrink-0">
          <SidePanel categoryTree={categoryTree} />
        </div>
        <div className="flex-1">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
