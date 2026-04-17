import { create } from "zustand";
import type { CartStore } from "@/types/cart";
import { persist } from "zustand/middleware";

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // klucz w localStorage
    },
  ),
);
