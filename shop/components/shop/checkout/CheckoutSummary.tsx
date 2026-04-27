"use client";

import { useCart } from "@/store/cart";
import { useCartTotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function CheckoutSummary() {
  const items = useCart((state) => state.items);
  const total = useCartTotal();

  if (items.length === 0) {
    return <p>Koszyk jest pusty</p>;
  }

  return (
    <div>
      <h2>Podsumowanie</h2>

      {items.map((item) => (
        <div key={item.product.id}>
          <p>{item.product.name}</p>
          <p>Ilość: {item.quantity}</p>
          <p>
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>
      ))}

      <hr />

      <h3>Suma: {formatPrice(total)}</h3>

      <p>📦 Odbiór osobisty</p>
    </div>
  );
}