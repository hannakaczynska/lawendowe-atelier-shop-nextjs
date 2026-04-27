import AddToCartButton from "../elements/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <img
        src={product.mainImage.src}
        alt={product.mainImage.alt}
        width={200}
        height={200}
      />
      <p>{formatPrice(product.regularPrice)}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
