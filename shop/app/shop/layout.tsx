import ScrollToTopButton from "@/components/elements/ScrollToToButton";
import ShopHeader from "@/components/ShopHeader";
import { ShopCategoryProvider } from "@/context/ShopCategoryContext";
import { getCategoryMap } from "@/lib/utils/category/wooCategoryMapper";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categoryTree, firstLevelSlugs } = await getCategoryMap();

  return (
    <ShopCategoryProvider categoryTree={categoryTree} firstLevelSlugs={firstLevelSlugs}>
      <ShopHeader />
      <div id="sticky-trigger"></div>
      {children}
      <ScrollToTopButton />
    </ShopCategoryProvider>
  );
}
