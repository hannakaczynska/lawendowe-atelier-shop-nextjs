"use client";
import { AccountProps } from "@/schemas/accountSchema";

export function AccountBillingAddress({ register, errors }: AccountProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Adres kupującego</h2>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Imię *"
        {...register("billingFirstName")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingFirstName ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingFirstName?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Nazwisko *"
        {...register("billingLastName")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingLastName ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingLastName?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Telefon (123 456 789) *"
        {...register("billingPhone")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingPhone ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingPhone?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Ulica i/lub numer *"
        {...register("billingStreet")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingStreet ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingStreet?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Mieszkanie / Apartament"
        {...register("billingFlat")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingFlat ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingFlat?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Miasto *"
        {...register("billingCity")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingCity ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingCity?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Kod pocztowy (00-000) *"
        {...register("billingPostcode")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingPostcode ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingPostcode?.message || " "}
      </p>
    </section>
  );
}
