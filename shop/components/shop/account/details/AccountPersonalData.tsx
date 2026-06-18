"use client";
import { AccountProps } from "@/schemas/accountSchema";

export function AccountPersonalData({ register, errors }: AccountProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Dane konta</h2>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Imię"
        {...register("firstName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.firstName?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Nazwisko"
        {...register("lastName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.lastName?.message || " "}
      </p>

      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        placeholder="Email (tylko do odczytu)"
        {...register("email")}
        disabled
      />
      <p className="text-xs h-[18px] my-1 opacity-0"> </p>
    </section>
  );
}
