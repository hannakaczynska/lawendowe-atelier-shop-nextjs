'use client';
import Link from "next/link";
import AddToCartButton from "../elements/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function ProductList({ products }: { products: Product[] }) {

  return (
    <ul className="flex flex-row wrap gap-8">
      {products.map((product) => (
        <li className="flex flex-col" key={product.id}>
          <Link href={`/shop/${product.slug}`} className="cursor-pointer">
            <img src={product.mainImage.src} alt={product.mainImage.alt} width={200} height={200} />
          </Link>
          <span>{product.name}</span>
          <span>{formatPrice(product.regularPrice)}</span>
          <AddToCartButton product={product} />
        </li>
      ))}
    </ul>
  );
}
