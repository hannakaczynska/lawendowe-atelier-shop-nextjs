"use client";

import { useCart, useCartTotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils/formatPrice";
import Link from "next/link";
import { handleIncreaseQuantity } from "@/lib/utils/handleIncreaseQuantity";

export default function CartPage() {
  const items = useCart((state) => state.items);
  console.log("Cart items:", items); // Log the cart items to the console

  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const clearCart = useCart((state) => state.clearCart);

  const total = useCartTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Twój koszyk</h1>
        <p className="text-[var(--grey)] mb-6">Koszyk jest pusty.</p>
        <Link
          href="/shop"
          className="cursor-pointer font-bold py-4 px-6 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300 mx-auto block text-center"
        >
          Wróć do sklepu
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] h-auto mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Twój koszyk</h1>

      <div className="flex flex-col md:flex-row md:items-start gap-10 w-full">
        {/* Left column — product list */}
        <div className="flex-1 flex flex-col gap-6 bg-[var(--secondary-color-light)] border border-[var(--light-grey)] px-4 py-4 md:px-6 md:py-6 rounded-md w-full">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="relative flex gap-4 border border-[var(--light-grey)] bg-white rounded-md px-4 py-4 w-full justify-between"
            >
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Miniatura */}
                <Link
                  href={`/shop/${item.product.categories[0].slug}/${item.product.slug}`}
                  className="cursor-pointer flex-shrink-0 w-[100px] h-[100px] rounded-lg overflow-hidden group"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={item.product.mainImage.thumbnail}
                    alt={item.product.mainImage.alt}
                    width={50}
                    height={50}
                  />
                </Link>

                {/* Product data */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-[var(--grey)]">
                      Cena za sztukę: {formatPrice(item.product.price)}
                    </p>
                  </div>

                  {/* Quantity + remove */}
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="cursor-pointer text-xl w-7 h-7 flex items-center justify-center rounded-md border border-[var(--secondary-color-light)] hover:bg-[var(--secondary-color-light)] transition-colors duration-300"
                      >
                        -
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() =>
                          handleIncreaseQuantity(
                            item.product.id,
                            item.product.quantity,
                            item.quantity,
                            increaseQuantity
                          )
                        }
                        className="cursor-pointer text-xl w-7 h-7 flex items-center justify-center rounded-md bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:bg-[var(--secondary-color)] disabled:hover:text-black"
                        disabled={item.quantity >= item.product.quantity}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="cursor-pointer text-[var(--out-of-stock)] text-sm"
                    >
                      <img src="/trash.svg" alt="Usuń" width={16} height={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total price */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <p className="font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="cursor-pointer w-full text-center py-3 rounded-md bg-[var(--secondary-color-light)] font-semibold hover:bg-[var(--secondary-color)] hover:text-white transition-colors duration-300"
          >
            ← Kontynuuj zakupy
          </Link>

          {/* Clear the cart */}
          <button
            onClick={() => clearCart()}
            className="cursor-pointer text-[var(--out-of-stock)] text-sm"
          >
            Wyczyść koszyk
          </button>
        </div>

        {/* RIGHT COLUMN — SUMMARY */}
        <div className="md:w-[250px] lg:w-[350px]">
          <div className="border border-[var(--light-grey)] rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Podsumowanie</h2>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between mb-2">
                <span className="text-[var(--grey)]">Suma produktów</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-[var(--grey)]">Dostawa</span>
                <span>—</span>
              </div>

              <hr className="border-[var(--light-grey)]" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Razem</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Link
                href="/shop/checkout"
                className="cursor-pointer font-bold py-3 rounded-md w-full bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300 mx-auto block text-center"
              >
                Przejdź do zamówienia
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
