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
      <div className="flex">
        <SidePanel categoryTree={categoryTree} />
        <ProductList products={products} />
      </div>
    </div>
  );
}
