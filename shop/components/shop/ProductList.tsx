'use client';
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductList({ products }: { products: Product[] }) {

  return (
    <ul className="flex flex-row wrap gap-8">
      {products.map((product) => (
        <li className="flex flex-col" key={product.id}>
          <Link href={`/shop/${product.slug}`} className="cursor-pointer">
            <img src={product.mainImage.src} alt={product.mainImage.alt} width={200} height={200} />
          </Link>
          <span>{product.name}</span>
          <span>{product.regularPrice}</span>
          <button>Dodaj do koszyka</button>
        </li>
      ))}
    </ul>
  );
}
