import ScrollToTopButton from "@/components/elements/ScrollToToButton";
import ShopHeader from "@/components/ShopHeader";
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <ShopHeader />
      <div id="sticky-trigger"></div> 
      {children}
      <ScrollToTopButton />
    </>
  );
}
