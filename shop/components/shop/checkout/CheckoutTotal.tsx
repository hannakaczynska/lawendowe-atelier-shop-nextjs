"use client";

import type { Step } from "./CheckoutWrapper";
import { useCart } from "@/store/cart";
import { useCartTotal } from "@/store/cart";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function CheckoutTotal({
  step,
  watch,
}: {
  step: Step;
  watch: any;
}) {
  const items = useCart((state) => state.items);
  const cartTotal = useCartTotal();

  if (items.length === 0) {
    return (
      <div className="border border-[var(--light-grey)] rounded-md p-6">
        <p>Koszyk jest pusty</p>
      </div>
    );
  }

  // FORM VALUES
  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  // DELIVERY COST
  const shippingCost =
    deliveryMethod === "local" ? 5 : 0;

  // PAYMENT FEE (optional)
  const paymentFee = 0;

  // FINAL TOTAL
  const finalTotal = cartTotal + shippingCost + paymentFee;

  return (
    <div className="border border-[var(--light-grey)] rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">Podsumowanie</h2>

      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-[var(--grey)]">
                {item.product.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <hr className="border-[var(--light-grey)]" />

        {/* PRODUCTS TOTAL */}
        <div className="flex justify-between mb-2">
          <span className="text-[var(--grey)]">Suma produktów</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>

        {/* DELIVERY */}
        <div className="flex justify-between mb-2">
          <span className="text-[var(--grey)]">Dostawa</span>

          {step >= 2 ? (
            <span>
              {shippingCost > 0 ? formatPrice(shippingCost) : "Za darmo"}
            </span>
          ) : (
            <span>—</span>
          )}
        </div>

        {/* PAYMENT */}
        <div className="flex justify-between mb-2">
          <span className="text-[var(--grey)]">Płatność</span>

          {step === 3 ? (
            <span>
              {paymentFee > 0 ? formatPrice(paymentFee) : "Bez opłat"}
            </span>
          ) : (
            <span>—</span>
          )}
        </div>

        <hr className="border-[var(--light-grey)]" />

        {/* FINAL TOTAL */}
        <div className="flex justify-between text-lg font-bold">
          <span>Razem</span>
          <span>
            {step === 1
              ? formatPrice(cartTotal)
              : step === 2
                ? formatPrice(cartTotal + shippingCost)
                : formatPrice(finalTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
