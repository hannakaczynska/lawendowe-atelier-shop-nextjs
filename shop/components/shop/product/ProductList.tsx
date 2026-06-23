"use client";
import Link from "next/link";
import { useCart } from "@/store/cart";
import AddToCartButton from "../../elements/AddToCartButton";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function ProductList({ products }: { products: Product[] }) {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,350px))] justify-center gap-6">
      {products.map((product) => {
        const cartItem = items.find((i) => i.product.id === product.id);
        const quantity = cartItem?.quantity ?? 0;

        return (
          <li
            className="flex flex-col gap-2 border border-solid border-[var(--light-grey)] rounded-lg p-6"
            key={product.id}
          >
            <Link
              href={`/shop/${product.categories[0].slug}/${product.slug}`}
              className="cursor-pointer w-full h-[300px] rounded-lg overflow-hidden group"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={product.mainImage.src}
                alt={product.mainImage.alt}
                width={200}
                height={200}
              />
            </Link>
            <span className="font-bold">{product.name}</span>
            <span>{formatPrice(product.regularPrice)}</span>
            <div className="w-full mt-2">
              {quantity === 0 ? (
                <div className="flex justify-center">
                <AddToCartButton product={product} />
              </div>
              ) : (
                <div className="flex justify-between gap-3 px-4 w-full items-center mt-4">
                  <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-md border border-[var(--light-grey)] text-lg font-bold hover:bg-[var(--secondary-color-light)] transition-colors duration-300"
                  >
                    –
                  </button>

                  <span className="min-w-[20px] text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-md bg-[var(--secondary-color)] text-lg font-bold hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300"
                  >
                    +
                  </button>
                  </div>
                  <img src="/trash.svg" alt="Remove from cart" className="w-6 h-6 cursor-pointer" onClick={() => removeFromCart(product.id)} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
