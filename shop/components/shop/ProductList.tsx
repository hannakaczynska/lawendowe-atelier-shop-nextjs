'use client';
import Link from "next/link";
import AddToCartButton from "../elements/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function ProductList({ products }: { products: Product[] }) {

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <li className="flex flex-col gap-2 border border-solid rounded-lg p-6" style={{ borderColor: "#ededed" }} key={product.id}>
          <Link href={`/shop/${product.categories[0].slug}/${product.slug}`} className="cursor-pointer w-full h-[300px] rounded-lg overflow-hidden group">
            <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={product.mainImage.src} alt={product.mainImage.alt} width={200} height={200} />
          </Link>
          <span className="font-bold">{product.name}</span>
          <span>{formatPrice(product.regularPrice)}</span>
          <div className="mx-auto">
          <AddToCartButton product={product} />
          </div>
        </li>
      ))}
    </ul>
  );
}
