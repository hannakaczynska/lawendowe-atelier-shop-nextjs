"use client";

import { useEffect } from "react";
import { AccountShippingAddress } from "@/components/shop/account/details/AccountShippingAdress";
import { Step } from "./CheckoutWrapper";
import { CheckoutProps, CheckoutSchema } from "@/schemas/checkoutSchema";
import { useUser } from "@/context/UserContext";
import { useAccountInitialData } from "@/store/checkout";
import { InitialDataState } from "@/types/checkout";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export default function CheckoutAddressDelivery({
  register,
  errors,
  trigger,
  watch,
  setValue,
  getValues,
  setStep,
}: CheckoutProps & {
  watch: any;
  setValue: any;
  getValues: any;
  setStep: (step: Step) => void;
}) {
  const deliveryMethod = watch("deliveryMethod");
  const shippingSameAsBilling = watch("shippingSameAsBilling");

  // shipping disabled jeśli odbiór osobisty
  const shippingDisabled = deliveryMethod === "pickup";
  const { authenticated } = useUser();
  const isLocalDelivery = deliveryMethod === "local";
  const saveShipping = getValues("saveShipping");

  const billingFirstName = watch("billingFirstName");
  const billingLastName = watch("billingLastName");
  const billingPhone = watch("billingPhone");
  const billingStreet = watch("billingStreet");
  const billingFlat = watch("billingFlat");
  const billingCity = watch("billingCity");
  const billingPostcode = watch("billingPostcode");

  const values = watch();
  const initial = useAccountInitialData();
  const authFetch = useAuthFetch();

  const compareShipping = (
    values: CheckoutSchema,
    initial: InitialDataState,
  ) => {
    return (
      values.shippingFirstName !== initial.shippingFirstName ||
      values.shippingLastName !== initial.shippingLastName ||
      values.shippingPhone !== initial.shippingPhone ||
      values.shippingStreet !== initial.shippingStreet ||
      values.shippingFlat !== initial.shippingFlat ||
      values.shippingCity !== initial.shippingCity ||
      values.shippingPostcode !== initial.shippingPostcode
    );
  };

  const shippingChanged = compareShipping(values, initial);

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
    if (isLocalDelivery) {
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

    if (valid && authenticated && saveShipping && shippingChanged) {
      const {
        saveBilling,
        saveShipping,
        paymentMethod,
        deliveryMethod,
        shippingSameAsBilling,
        ...rest
      } = values;
      const currentForm = {
        ...rest,
        billingFirstName: "",
        billingLastName: "",
        billingPhone: "",
        billingStreet: "",
        billingFlat: "",
        billingCity: "",
        billingPostcode: "",
      };

      const res = await authFetch("/api/account/update", {
        method: "POST",
        body: JSON.stringify(currentForm),
      });
      //change initial data in store (Zustand) to current form data

      console.log("Saving shipping address to account...", currentForm);
      console.log("Response from /api/account/update:", res);
    }

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

      {isLocalDelivery && authenticated && shippingChanged && (
        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <input
            type="checkbox"
            {...register("saveShipping")}
            className="accent-[var(--in-stock)]"
          />
          <span className="text-sm">
            Zapisz ten adres dostawy na moim koncie
          </span>
        </label>
      )}

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
