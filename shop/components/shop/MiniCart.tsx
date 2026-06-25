"use client";

import { useCart, useCartTotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils/formatPrice";
import Link from "next/link";
import { handleIncreaseQuantity } from "@/lib/utils/handleIncreaseQuantity";

export default function MiniCart({ closeMiniCart }: { closeMiniCart: () => void }) {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-sm">Twój koszyk jest pusty</div>
    );
  }

  const total = useCartTotal();

  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      {items.map(({ product, quantity }) => (
        <div
          key={product.id}
          className="flex justify-between items-center gap-3"
        >
          <Link
            href={`/shop/${product.categories[0].slug}/${product.slug}`}
            onClick={closeMiniCart}
            className="cursor-pointer flex-shrink-0 w-14 h-14 rounded-md overflow-hidden group"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              src={product.mainImage.thumbnail}
              alt={product.mainImage.alt}
              width={50}
              height={50}
            />
          </Link>

          <div className="flex-1">
            <p className="font-semibold text-sm">{product.name}</p>
            <p className="text-xs text-[var(--grey)]">
              {formatPrice(product.regularPrice)}
            </p>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="cursor-pointer w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-md border border-[var(--secondary-color-light)] hover:bg-[var(--secondary-color-light)] transition-colors duration-300"
            >
              –
            </button>

            <span className="min-w-[20px] text-center">{quantity}</span>

            <button
              onClick={() => handleIncreaseQuantity(product.id, product.quantity, quantity, increaseQuantity)}
              className="cursor-pointer w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-md bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:bg-[var(--secondary-color)] disabled:hover:text-black"
              disabled={quantity >= product.quantity}
            >
              +
            </button>
          </div>

          <img
            src="/trash.svg"
            alt="Remove from cart"
            className="md:w-5 md:h-5 w-4 h-4 cursor-pointer"
            onClick={() => removeFromCart(product.id)}
          />
        </div>
      ))}

      <div className="flex justify-between items-center pt-2 border-t border-[var(--light-grey)]">
        <span className="font-semibold text-sm">Razem:</span>
        <span className="font-bold text-sm">{formatPrice(total)}</span>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/shop/cart"
          onClick={closeMiniCart}
          className="mt-2 w-full text-center py-2 rounded-md bg-[var(--secondary-color-light)] font-semibold hover:bg-[var(--secondary-color)] hover:text-white transition-colors duration-300"
        >
          Przejdź do koszyka
        </Link>
        <Link
          href="/checkout"
          onClick={closeMiniCart}
          className="mt-2 w-full text-center py-2 rounded-md bg-[var(--secondary-color)] font-semibold hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
        >
          Złóż zamówienie
        </Link>
      </nav>
    </div>
  );
}
