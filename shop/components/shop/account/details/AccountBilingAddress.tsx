"use client";
import { AccountProps } from "@/schemas/accountSchema";


export function AccountBillingAddress({ register, errors }: AccountProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Adres kupującego</h2>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Imię"
        {...register("billingFirstName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingFirstName?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Nazwisko"
        {...register("billingLastName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingLastName?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Telefon"
        {...register("billingPhone")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingPhone?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Ulica i numer"
        {...register("billingStreet")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingStreet?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Miasto"
        {...register("billingCity")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingCity?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Kod pocztowy"
        {...register("billingPostcode")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingPostcode?.message || " "}
      </p>
    </section>
  );
}
