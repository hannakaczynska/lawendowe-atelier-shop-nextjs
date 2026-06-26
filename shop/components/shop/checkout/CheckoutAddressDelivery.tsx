"use client";

import { useEffect } from "react";
import { AccountShippingAddress } from "@/components/shop/account/details/AccountShippingAdress";
import { Step } from "./CheckoutWrapper";
import { CheckoutProps, CheckoutSchema } from "@/schemas/checkoutSchema";
import { useUser } from "@/context/UserContext";

export default function CheckoutAddressDelivery({
  register,
  errors,
  trigger,
  watch,
  setValue,
  setStep,
}: CheckoutProps & {
  watch: any;
  setValue: any;
  setStep: (step: Step) => void;
}) {
  const deliveryMethod = watch("deliveryMethod");
  const shippingSameAsBilling = watch("shippingSameAsBilling");

  // shipping disabled jeśli odbiór osobisty
  const shippingDisabled = deliveryMethod === "pickup";
  const { authenticated } = useUser();

  const billingFirstName = watch("billingFirstName");
  const billingLastName = watch("billingLastName");
  const billingPhone = watch("billingPhone");
  const billingStreet = watch("billingStreet");
  const billingFlat = watch("billingFlat");
  const billingCity = watch("billingCity");
  const billingPostcode = watch("billingPostcode");

  useEffect(() => {
    if (shippingSameAsBilling && !shippingDisabled) {
      setValue("shippingFirstName", billingFirstName);
      setValue("shippingLastName", billingLastName);
      setValue("shippingPhone", billingPhone);
      setValue("shippingStreet", billingStreet);
      setValue("shippingFlat", billingFlat);
      setValue("shippingCity", billingCity);
      setValue("shippingPostcode", billingPostcode);
    }

    if (!shippingSameAsBilling && !authenticated) {
      setValue("shippingFirstName", "");
      setValue("shippingLastName", "");
      setValue("shippingPhone", "");
      setValue("shippingStreet", "");
      setValue("shippingFlat", "");
      setValue("shippingCity", "");
      setValue("shippingPostcode", "");
    }
  }, [shippingSameAsBilling]);

  const handleNext = async () => {
    const fieldsToValidate: (keyof CheckoutSchema)[] = ["deliveryMethod"];

    // jeśli dostawa lokalna → walidujemy shipping
    if (watch("deliveryMethod") === "local") {
      fieldsToValidate.push(
        "shippingFirstName",
        "shippingLastName",
        "shippingPhone",
        "shippingStreet",
        "shippingCity",
        "shippingPostcode",
      );
    }

    const valid = await trigger(fieldsToValidate);

    if (valid) {
      setStep(3);
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Dostawa</h2>

      {/* choose delivery method */}
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
          <span>Dostawa lokalna (5 zł)</span>
        </label>
        <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
          {errors.deliveryMethod?.message ? "Wybierz metodę dostawy" : " "}
        </p>
      </div>

      {/* shipping address */}
      {deliveryMethod === "local" && (
        <AccountShippingAddress<CheckoutSchema>
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
          onClick={() => {
            setStep(1);
            console.log("step 2");
          }}
          className="cursor-pointer mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color-light)] hover:text-white hover:bg-[var(--secondary-color)] transition-colors duration-300"
        >
          ← Wróć
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="cursor-pointer mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
        >
          Dalej →
        </button>
      </div>
    </section>
  );
}
