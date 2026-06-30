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
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Dane zamawiającego</h2>

      {!authenticated && (
        <div className="flex gap-4 mb-4 text-sm">
          <Link href="/shop/login" className="underline text-[var(--primary-color)] cursor-pointer">Zaloguj się</Link>
          <Link href="/shop/register" className="underline text-[var(--secondary-color)] cursor-pointer">Załóż konto</Link>
        </div>
      )}

      <label className="text-[var(--grey)] block mb-1">Imię *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        {...register("billingFirstName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingFirstName?.message || " "}
      </p>

      <label className="text-[var(--grey)] block mb-1">Nazwisko *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        {...register("billingLastName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingLastName?.message || " "}
      </p>

      <label className="text-[var(--grey)] block mb-1">Email *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        {...register("billingEmail")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingEmail?.message || " "}
      </p>

      <label className="text-[var(--grey)] block mb-1">Telefon *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        {...register("billingPhone")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingPhone?.message || " "}
      </p>

      <label className="text-[var(--grey)] block mb-1">Ulica i numer *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        {...register("billingStreet")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingStreet?.message || " "}
      </p>

      <label className="text-[var(--grey)] block mb-1">Numer mieszkania</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        {...register("billingFlat")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingFlat?.message || " "}
      </p>

      <label className="text-[var(--grey)] block mb-1">Miasto *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        {...register("billingCity")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingCity?.message || " "}
      </p>

      <label className="text-[var(--grey)] block mb-1">Kod pocztowy *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        {...register("billingPostcode")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingPostcode?.message || " "}
      </p>

      {authenticated && billingChanged && (
        <label className="flex items-center gap-2 mt-10 mb-4 cursor-pointer">
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

      <div className="flex gap-6 justify-center">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="cursor-pointer mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color-light)] hover:text-white hover:bg-[var(--secondary-color)] transition-colors duration-300"
        >
          ← Wróć
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={`${saveBillingData ? "cursor-not-allowed" : "cursor-pointer"} mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300`}
          disabled={saveBillingData}
        >
          {saveBillingData ? "Zapisuję dane..." : "Dalej →"}
        </button>
      </div>
    </section>
  );
}
