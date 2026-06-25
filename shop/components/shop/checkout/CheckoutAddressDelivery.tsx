"use client";

import { AccountShippingAddress } from "@/components/shop/account/details/AccountShippingAdress";
import { Step } from "./CheckoutWrapper";
import { ShippingProps, ShippingSchema } from "@/schemas/shippingSchema";

export default function CheckoutAddressDelivery({
  register,
  errors,
  watch,
  setValue,
  setStep,
}: {
  register: ShippingProps["register"];
  errors: ShippingProps["errors"];
  watch: any;
  setValue: any;
  setStep: (step: Step) => void;
}) {
  const deliveryMethod = watch("deliveryMethod");
  const shippingSameAsBilling = watch("shippingSameAsBilling");

  // shipping disabled jeśli odbiór osobisty
  const shippingDisabled = deliveryMethod === "pickup";

  // kopiowanie billing → shipping gdy checkbox aktywny
  const billingFields = watch([
    "billingFirstName",
    "billingLastName",
    "billingPhone",
    "billingStreet",
    "billingFlat",
    "billingCity",
    "billingPostcode",
  ]);

  // automatyczne kopiowanie billing → shipping
  if (shippingSameAsBilling && !shippingDisabled) {
    setValue("shippingFirstName", billingFields[0]);
    setValue("shippingLastName", billingFields[1]);
    setValue("shippingPhone", billingFields[2]);
    setValue("shippingStreet", billingFields[3]);
    setValue("shippingFlat", billingFields[4]);
    setValue("shippingCity", billingFields[5]);
    setValue("shippingPostcode", billingFields[6]);
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Dostawa</h2>

      {/* WYBÓR METODY DOSTAWY */}
      <div className="mb-6 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="pickup"
            {...register("deliveryMethod")}
            className="accent-[var(--in-stock)]"
          />
          <span>Odbiór osobisty (0 zł)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="local"
            {...register("deliveryMethod")}
            className="accent-[var(--in-stock)]"
          />
          <span>Dostawa lokalna (10 zł)</span>
        </label>
      </div>

      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.deliveryMethod?.message || " "}
      </p>

      {/* ADRES DOSTAWY */}
      {deliveryMethod === "local" && (
        <AccountShippingAddress<ShippingSchema>
          register={register}
          errors={errors}
          shippingDisabled={shippingSameAsBilling}
        />
      )}

      <button type="button" className="cursor-pointer">
        Zapisz zmiany na później
      </button>

      <div className="flex gap-6 justify-center">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="cursor-pointer mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color-light)] hover:text-white hover:bg-[var(--secondary-color)] transition-colors duration-300"
        >
          ← Wróć
        </button>

        <button
          type="button"
          onClick={() => setStep(3)}
          className="cursor-pointer mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
        >
          Dalej →
        </button>
      </div>
    </section>
  );
}
