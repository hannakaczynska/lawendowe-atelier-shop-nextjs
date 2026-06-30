"use client";

import { useEffect, useState } from "react";
import { AccountShippingAddress } from "@/components/shop/account/details/AccountShippingAdress";
import { Step } from "./CheckoutWrapper";
import { CheckoutProps, CheckoutSchema } from "@/schemas/checkoutSchema";
import { useUser } from "@/context/UserContext";
import { useAccountInitialData } from "@/store/checkout";
import { InitialDataState } from "@/types/checkout";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { toast } from "sonner";

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
  const { setInitialData } = useAccountInitialData();
  const isLocalDelivery = deliveryMethod === "local";
  const saveShipping = getValues("saveShipping");

  const [saveShippingData, setSaveShippingData] = useState(false);

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
      setSaveShippingData(true);
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

      if (!res.ok) {
        toast.error("Wystąpił błąd podczas aktualizacji danych");
      } else {
        const data = await res.json();
        setInitialData(data.updated);
        toast.success("Dane dostawy zostały zapisane na koncie");
      }
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
          className={`${saveShippingData ? "cursor-not-allowed" : "cursor-pointer"} mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300`}
          disabled={saveShippingData}
        >
          {saveShippingData ? "Zapisuję dane..." : "Dalej →"}
        </button>
      </div>
    </section>
  );
}
