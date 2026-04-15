'use client';
import Link from "next/link";
export default function ProductList({ products }: { products: any[] }) {

  return (
    <ul className="flex flex-row wrap gap-8">
      {products.map((product) => (
        <li className="flex flex-col" key={product.id}>
          <Link href={`/shop/${product.slug}`} className="cursor-pointer">
            <img src={product.images[0].src} alt={product.name} width={200} height={200} />
          </Link>
          <span>{product.name}</span>
          <span>{product.prices.regular_price}</span>
          <button>Dodaj do koszyka</button>
        </li>
      ))}
    </ul>
  );
}
