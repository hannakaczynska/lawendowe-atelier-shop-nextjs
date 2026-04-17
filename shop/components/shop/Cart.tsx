"use client";

import { useCart } from "@/store/cart";

export default function Cart() {
  const items = useCart((state) => state.items);

  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const clearCart = useCart((state) => state.clearCart);

  return (
    <div>
      <h1>Koszyk</h1>
      <ul>
        {items.map((item) => (
          <li key={item.product.id}>
            <p>{item.product.name}</p>
            <p>Ilość: {item.quantity}</p>
            <div className="flex gap-12">
            <button onClick={() => increaseQuantity(item.product.id)}>+</button>
            <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
            <button onClick={() => removeFromCart(item.product.id)}>
              Usuń
            </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => clearCart()}>Wyczyść koszyk</button>
    </div>
  );
}
