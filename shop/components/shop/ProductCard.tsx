import AddToCartButton from "../elements/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";
import ProductGallery from "../elements/carousel/Carousel";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <ProductGallery images={product.images} />
      <h1>{product.name}</h1>
      <p>{formatPrice(product.regularPrice)}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
