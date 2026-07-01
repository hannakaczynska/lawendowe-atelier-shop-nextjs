"use client";

import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import type { Step } from "./CheckoutWrapper";
import { CheckoutProps } from "@/schemas/checkoutSchema";
import { useAccountInitialData } from "@/store/checkout";
import { InitialDataState } from "@/types/checkout";
import { CheckoutSchema } from "@/schemas/checkoutSchema";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useState } from "react";
import Link from "next/link";
import FormTextInput from "@/components/elements/FormTextInput";

export function CheckoutCustomerData({
  register,
  errors,
  trigger,
  getValues,
  watch,
  setStep,
}: {
  register: CheckoutProps["register"];
  errors: CheckoutProps["errors"];
  trigger: CheckoutProps["trigger"];
  getValues: any;
  watch: any;
  setStep: (step: Step) => void;
}) {
  const { authenticated } = useUser();
  const { setInitialData } = useAccountInitialData();
  const saveBilling = getValues("saveBilling");
  const [saveBillingData, setSaveBillingData] = useState(false);

  const values = watch();
  const initial = useAccountInitialData();
  const authFetch = useAuthFetch();

  const compareBilling = (
    values: CheckoutSchema,
    initial: InitialDataState,
  ) => {
    return (
      values.billingFirstName !== initial.billingFirstName ||
      values.billingLastName !== initial.billingLastName ||
      values.billingPhone !== initial.billingPhone ||
      values.billingStreet !== initial.billingStreet ||
      values.billingFlat !== initial.billingFlat ||
      values.billingCity !== initial.billingCity ||
      values.billingPostcode !== initial.billingPostcode
    );
  };

  const billingChanged = compareBilling(values, initial);

  const handleNext = async () => {
    const valid = await trigger([
      "billingFirstName",
      "billingLastName",
      "billingEmail",
      "billingPhone",
      "billingStreet",
      "billingCity",
      "billingPostcode",
    ]);

    if (valid && authenticated && saveBilling && billingChanged) {
      setSaveBillingData(true);
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
        shippingFirstName: "",
        shippingLastName: "",
        shippingPhone: "",
        shippingStreet: "",
        shippingFlat: "",
        shippingCity: "",
        shippingPostcode: "",
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
        toast.success("Dane rozliczeniowe zostały zapisane na koncie");
      }
    }

    if (valid) setStep(2);
  };

  return (
    <section className="md:relative mb-10">
      <h2 className="text-xl font-semibold mb-4">Dane zamawiającego</h2>

      {!authenticated && (
        <div className="flex gap-4 mb-4 text-sm">
          <Link
            href="/shop/login"
            className="underline text-[var(--primary-color)] cursor-pointer"
          >
            Zaloguj się
          </Link>
          <Link
            href="/shop/register"
            className="underline text-[var(--secondary-color)] cursor-pointer"
          >
            Załóż konto
          </Link>
        </div>
      )}
      <div className="w-full lg:flex lg:gap-10 lg:px-8 xl:gap-20 xl:px-10">
        <div className="flex-1">
          <FormTextInput
            label="Imię *"
            id="billingFirstName"
            register={register}
            error={errors.billingFirstName}
          />
          <FormTextInput
            label="Nazwisko *"
            id="billingLastName"
            register={register}
            error={errors.billingLastName}
          />
          <FormTextInput
            label="Email *"
            id="billingEmail"
            register={register}
            error={errors.billingEmail}
          />
          <FormTextInput
            label="Telefon *"
            id="billingPhone"
            register={register}
            error={errors.billingPhone}
          />
        </div>
        <div className="flex-1">
          <FormTextInput
            label="Ulica i numer *"
            id="billingStreet"
            register={register}
            error={errors.billingStreet}
          />
          <FormTextInput
            label="Numer mieszkania"
            id="billingFlat"
            register={register}
            error={errors.billingFlat}
          />
          <FormTextInput
            label="Miasto *"
            id="billingCity"
            register={register}
            error={errors.billingCity}
          />
          <FormTextInput
            label="Kod pocztowy *"
            id="billingPostcode"
            register={register}
            error={errors.billingPostcode}
          />
        </div>
      </div>

      {authenticated && billingChanged && (
        <label className="flex lg:px-8 xl:px-10 items-center gap-2 mt-10 mb-4 cursor-pointer">
          <input
            type="checkbox"
            {...register("saveBilling")}
            className="accent-[var(--in-stock)]"
          />
          <span className="text-sm">
            Zapisz ten adres rozliczeniowy na moim koncie
          </span>
        </label>
      )}

      <div className="flex md:absolute bottom-[-72px] lg:static md:w-screen lg:w-full gap-6 justify-center">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="cursor-pointer text-sm md:text-base mt-4 w-[150px] md:w-[200px] lg:w-[250px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color-light)] hover:text-white hover:bg-[var(--secondary-color)] transition-colors duration-300"
        >
          ← Wróć
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`${saveBillingData ? "cursor-not-allowed" : "cursor-pointer"} text-sm md:text-base mt-4 w-[150px] md:w-[200px] lg:w-[250px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300`}
          disabled={saveBillingData}
        >
          {saveBillingData ? "Zapisuję dane..." : "Dalej →"}
        </button>
      </div>
    </section>
  );
}
