"use client";

import type { Step } from "./CheckoutWrapper";
import { PaymentProps } from "@/schemas/paymentSchema";

export default function CheckoutPayment({
  register,
  errors,
  setStep,
  onSubmit,
}: PaymentProps & {
  setStep: (step: Step) => void;
  onSubmit: () => void;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Płatność</h2>

      {/* METODY PŁATNOŚCI */}
      <div className="space-y-4 mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            value="blik"
            {...register("paymentMethod")}
            className="accent-[var(--in-stock)]"
          />
          <span>BLIK</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            value="p24"
            {...register("paymentMethod")}
            className="accent-[var(--in-stock)]"
          />
          <span>Przelewy24</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            value="cash"
            {...register("paymentMethod")}
            className="accent-[var(--in-stock)]"
          />
          <span>Gotówka przy odbiorze</span>
        </label>
      </div>

      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.paymentMethod?.message || " "}
      </p>

      {/* PRZYCISKI NAWIGACJI */}
      <div className="flex gap-6 justify-center mt-6">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="cursor-pointer w-[200px] md:w-[300px] font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color-light)] hover:text-white hover:bg-[var(--secondary-color)] transition-colors duration-300"
        >
          ← Wróć
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="cursor-pointer w-[200px] md:w-[300px] font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
        >
          Złóż zamówienie →
        </button>
      </div>
    </section>
  );
}
