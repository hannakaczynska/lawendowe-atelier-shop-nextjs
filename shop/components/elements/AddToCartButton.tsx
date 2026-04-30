"use client";

import { useCart } from "@/store/cart";
import type { Product } from "@/types/product";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <button className="cursor-pointer font-bold py-4 px-6 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300" onClick={() => addToCart(product)}>
      Dodaj do koszyka
    </button>
  );
}