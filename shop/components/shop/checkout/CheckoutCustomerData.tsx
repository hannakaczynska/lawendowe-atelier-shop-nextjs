"use client";

import { useUser } from "@/context/UserContext";
import type {Step} from "./CheckoutWrapper";
import { CustomerProps } from "@/schemas/customerSchema";

export function CheckoutCustomerData({
  register,
  errors,
  trigger,
  setStep,
}: {
  register: CustomerProps["register"];
  errors: CustomerProps["errors"];
  trigger: CustomerProps["trigger"];
  setStep: (step: Step) => void;
}) {
  const { authenticated } = useUser();

  const handleNext = async () => {
  const valid = await trigger([
    "billingFirstName",
    "billingLastName",
    "email",
    "billingPhone",
    "billingStreet",
    "billingCity",
    "billingPostcode",
  ]);

  if (valid) setStep(2);
};


  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Dane zamawiającego</h2>

      {!authenticated && (
        <div className="flex gap-4 mb-4 text-sm">
          <button className="underline cursor-pointer">Zaloguj się</button>
          <button className="underline cursor-pointer">Załóż konto</button>
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
        {...register("email")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.email?.message || " "}
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

      <button type="button" className="cursor-pointer">Zapisz zmiany na później</button>

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
          className="cursor-pointer mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
        >
          Dalej →
        </button>
      </div>
    </section>
  );
}
