import type { Product } from "@/types/product";
import ProductCardGallery from "./ProductCardGallery";
import ProductCardDesc from "./ProductCardDesc";
import ProductCardMoreInfo from "./ProductCardMoreInfo";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] px-4 lg:px-10 gap-10">
      <ProductCardGallery images={product.images} />
      <ProductCardDesc product={product} />
      <ProductCardMoreInfo product={product} />
    </div>
  );
}