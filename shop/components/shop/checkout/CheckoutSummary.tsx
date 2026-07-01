"use client";

import { useCartTotal, useCart } from "@/store/cart";
import { Step } from "./CheckoutWrapper";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function CheckoutSummary({
  watch,
  setStep,
}: {
  watch: any;
  setStep: (step: Step) => void;
}) {
  const items = useCart((state) => state.items);
  const total = useCartTotal();

  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  const billing = {
    firstName: watch("billingFirstName"),
    lastName: watch("billingLastName"),
    phone: watch("billingPhone"),
    email: watch("billingEmail"),
    street: watch("billingStreet"),
    flat: watch("billingFlat"),
    city: watch("billingCity"),
    postcode: watch("billingPostcode"),
  };

  const shipping = {
    firstName: watch("shippingFirstName"),
    lastName: watch("shippingLastName"),
    phone: watch("shippingPhone"),
    street: watch("shippingStreet"),
    flat: watch("shippingFlat"),
    city: watch("shippingCity"),
    postcode: watch("shippingPostcode"),
  };

  const shippingCost = deliveryMethod === "local" ? 5 : 0;
  const paymentCost = 0;

  const handleOrder = () => {
    // Here you can handle the order submission logic
    // For example, you can call an API to create the order
    // and then redirect the user to a confirmation page
    console.log("Order submitted");
  };

  return (
    <div className="flex flex-col max-w-[1200px] mx-auto gap-6">
      {/* BILLING */}
      <div className="flex flex-col md:flex-row md:space-between gap-8 md:gap-20 border border-[var(--light-grey)] rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex-1 flex flex-col gap-6">
          <section className="text-sm md:text-base flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Dane rozliczeniowe</h3>
              <button
                type="button"
                className="text-sm cursor-pointer text-[var(--primary-color)]"
                onClick={() => setStep(1)}
              >
                Edytuj
              </button>
            </div>

            <p>
              {billing.firstName} {billing.lastName}
            </p>
            <p>{billing.email}</p>
            <p>
              {billing.street}
              {billing.flat && `/${billing.flat}`}
            </p>
            <p>
              {billing.postcode} {billing.city}
            </p>
            <p>{billing.phone}</p>
          </section>

          {/* SHIPPING */}
          {deliveryMethod !== "pickup" && (
            <section className="flex flex-col text-sm md:text-base gap-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Adres dostawy</h3>
                <button
                  type="button"
                  className="text-sm cursor-pointer text-[var(--primary-color)]"
                  onClick={() => setStep(2)}
                >
                  Edytuj
                </button>
              </div>

              <p>
                {shipping.firstName} {shipping.lastName}
              </p>
              <p>
                {shipping.street}
                {shipping.flat && `/${shipping.flat}`}
              </p>
              <p>
                {shipping.postcode} {shipping.city}
              </p>
              <p>{shipping.phone}</p>
            </section>
          )}

          {/* DELIVERY METHOD */}
          <section className="flex text-sm md:text-base flex-col gap-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Metoda dostawy</h3>
              <button
                type="button"
                className="text-sm cursor-pointer text-[var(--primary-color)]"
                onClick={() => setStep(2)}
              >
                Edytuj
              </button>
            </div>
            <p className="capitalize">{deliveryMethod}</p>
          </section>

          {/* PAYMENT METHOD */}
          <section className="flex flex-col text-sm md:text-base gap-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Metoda płatności</h3>
              <button
                type="button"
                className="text-sm cursor-pointer text-[var(--primary-color)]"
                onClick={() => setStep(3)}
              >
                Edytuj
              </button>
            </div>
            <p className="capitalize">{paymentMethod}</p>
          </section>
        </div>

        {/* CART WITH THUMBNAILS */}
        <div className="flex-1 flex flex-col gap-6">
          <section className="flex flex-col text-sm md:text-base gap-3">
            <h3 className="font-semibold">Produkty</h3>

            <div className="flex flex-col gap-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={product.mainImage.thumbnail}
                      alt={product.mainImage.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs md:text-sm text-[var(--grey)]">
                      {quantity} × {formatPrice(product.price)}
                    </p>
                  </div>

                  <span className="font-semibold">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* TOTAL */}
          <section className="flex flex-col gap-2 pt-2 text-sm md:text-base border-t border-[var(--light-grey)]">
            {" "}
            <div className="flex justify-between">
              <span className="text-[var(--grey)]">Dostawa</span>
              <span>{formatPrice(shippingCost)}</span>
            </div>
                        <div className="flex justify-between">
              <span className="text-[var(--grey)]">Płatność</span>
              <span>{formatPrice(paymentCost)}</span>
            </div>
            <div className="flex justify-between text-base md:text-lg font-bold">
              <span>Razem</span>
              <span>{formatPrice(total + shippingCost + paymentCost)}</span>
            </div>
          </section>
        </div>
      </div>

      {/* navigation buttons */}
      <section className="flex gap-6 justify-center mt-6">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="cursor-pointer text-sm md:text-base mt-4 w-[150px] md:w-[200px] lg:w-[250px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color-light)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors duration-300"
        >
          ← Wróć
        </button>

        <button
          type="button"
          onClick={handleOrder}
          className="cursor-pointer text-sm md:text-base mt-4 w-[150px] md:w-[200px] lg:w-[250px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
        >
          Złóż zamówienie
        </button>
      </section>
    </div>
  );
}
