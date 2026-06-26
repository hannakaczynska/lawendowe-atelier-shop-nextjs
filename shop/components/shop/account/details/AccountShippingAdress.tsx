"use client";
import { AccountProps } from "@/schemas/accountSchema";
import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";

interface ShippingAddressProps<T extends FieldValues> { 
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  shippingDisabled: boolean | undefined;
}

export function AccountShippingAddress<T extends FieldValues>({
  register,
  errors,
  shippingDisabled,
}: ShippingAddressProps<T>) {
  return (
    <section className="mb-10 w-full">
      <h2 className="text-xl font-semibold mb-4">Adres dostawy</h2>

      <label className="flex items-center gap-2 mb-4 cursor-pointer">
        <input
          type="checkbox"
          className="accent-[var(--in-stock)]"
          {...register("shippingSameAsBilling" as any)}
        />
        <span className="text-sm">Taki sam jak kupującego</span>
      </label>

      <label
        htmlFor="shippingFirstName"
        className="text-[var(--grey)] block mb-1"
      >
        Imię *
      </label>
      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        id="shippingFirstName"
        disabled={shippingDisabled}
        {...register("shippingFirstName" as any)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingFirstName && !shippingDisabled ? "opacity-100" : "opacity-0"}`}
      >
        {(errors as any).shippingFirstName?.message || " "}
      </p>

      <label
        htmlFor="shippingLastName"
        className="text-[var(--grey)] block mb-1"
      >
        Nazwisko *
      </label>
      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        id="shippingLastName"
        disabled={shippingDisabled}
        {...register("shippingLastName" as any)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingLastName && !shippingDisabled ? "opacity-100" : "opacity-0"}`}
      >
        {(errors as any).shippingLastName?.message || " "}
      </p>

      <label htmlFor="shippingPhone" className="text-[var(--grey)] block mb-1">
        Telefon *
      </label>
      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        id="shippingPhone"
        placeholder="123 456 789"
        disabled={shippingDisabled}
        {...register("shippingPhone" as any)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingPhone && !shippingDisabled ? "opacity-100" : "opacity-0"}`}
      >
        {(errors as any).shippingPhone?.message || " "}
      </p>

      <label htmlFor="shippingStreet" className="text-[var(--grey)] block mb-1">
        Ulica i/lub numer *
      </label>
      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        id="shippingStreet"
        disabled={shippingDisabled}
        {...register("shippingStreet" as any)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingStreet && !shippingDisabled ? "opacity-100" : "opacity-0"}`}
      >
        {(errors as any).shippingStreet?.message || " "}
      </p>

      <label htmlFor="shippingFlat" className="text-[var(--grey)] block mb-1">
        Mieszkanie / Apartament
      </label>
      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        id="shippingFlat"
        disabled={shippingDisabled}
        {...register("shippingFlat" as any)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingFlat && !shippingDisabled ? "opacity-100" : "opacity-0"}`}
      >
        {(errors as any).shippingFlat?.message || " "}
      </p>

      <label htmlFor="shippingCity" className="text-[var(--grey)] block mb-1">
        Miasto *
      </label>
      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        id="shippingCity"
        disabled={shippingDisabled}
        {...register("shippingCity" as any)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingCity && !shippingDisabled ? "opacity-100" : "opacity-0"}`}
      >
        {(errors as any).shippingCity?.message || " "}
      </p>

      <label
        htmlFor="shippingPostcode"
        className="text-[var(--grey)] block mb-1"
      >
        Kod pocztowy *
      </label>
      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        id="shippingPostcode"
        placeholder="00-000"
        disabled={shippingDisabled}
        {...register("shippingPostcode" as any)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingPostcode && !shippingDisabled ? "opacity-100" : "opacity-0"}`}
      >
        {(errors as any).shippingPostcode?.message || " "}
      </p>
    </section>
  );
}
