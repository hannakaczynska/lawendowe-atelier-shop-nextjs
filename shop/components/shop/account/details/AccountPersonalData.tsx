"use client";
import { AccountProps } from "@/schemas/accountSchema";

export function AccountPersonalData({ register, errors }: AccountProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Dane konta</h2>

      <label htmlFor="firstName" className="text-[var(--grey)] block mb-1">
        Imię *
      </label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="firstName"
        {...register("firstName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.firstName?.message || " "}
      </p>

      <label htmlFor="lastName" className="text-[var(--grey)] block mb-1">
        Nazwisko *
      </label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="lastName"
        {...register("lastName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.lastName?.message || " "}
      </p>

      <label htmlFor="email" className="text-[var(--grey)] block mb-1">
        Email (tylko do odczytu)
      </label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="email"
        placeholder="Email (tylko do odczytu)"
        {...register("email")}
        disabled
      />
      <p className="text-xs h-[18px] my-1 opacity-0"> </p>
    </section>
  );
}
