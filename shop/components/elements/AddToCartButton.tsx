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
    <button className="cursor-pointer" onClick={() => addToCart(product)}>
      Dodaj do koszyka
    </button>
  );
}