import ProductList from "@/components/shop/product/ProductList";
import SidePanel from "@/components/shop/category/SidePanel/SidePanel";
import CategoryNavigation from "@/components/shop/category/CategoryNavigation";
import MobilePanel from "@/components/shop/category/MobilePanel";
import { getProducts } from "@/lib/woo/getProducts";


export default async function Shop() {
  const products = await getProducts();

  return (
    <>
      <div className="hidden md:block mt-[100px] w-screen h-[100px] bg-[url('/shop-header.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      </div>
      <div className="md:hidden max-w-[500px] mx-auto mt-[110px]">
      <CategoryNavigation slugs={["all"]} />
      <MobilePanel />
      </div>
      <div className="flex max-w-[1500px] mx-auto px-4 py-1 my-6 md:py-8 md:mt-6">
        <div className="hidden md:block md:w-[250px] lg:w-[300px] shrink-0">
          <SidePanel />
        </div>
        <div className="flex-1">
          <ProductList products={products} />
        </div>
      </div>
    </>
  );
}
