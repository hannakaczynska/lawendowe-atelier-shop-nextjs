import type { Product } from "@/types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartStore = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number, quantity: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};
