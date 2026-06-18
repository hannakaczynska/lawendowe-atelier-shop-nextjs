"use client";
import { AccountProps } from "@/schemas/accountSchema";

interface ShippingAddressProps extends AccountProps {
  shippingDisabled: boolean | undefined;
}

export function AccountShippingAddress({ register, errors, shippingDisabled }: ShippingAddressProps) {
  return (
    <section className="mb-10 w-full">
      <h2 className="text-xl font-semibold mb-4">Adres wysyłki</h2>

      <label className="flex items-center gap-2 mb-4 cursor-pointer">
        <input type="checkbox" {...register("shippingSameAsBilling")} />
        <span className="text-sm">Taki sam jak kupującego</span>
      </label>

      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        placeholder="Imię"
        disabled={shippingDisabled}
        {...register("shippingFirstName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.shippingFirstName?.message || " "}
      </p>

      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        placeholder="Nazwisko"
        disabled={shippingDisabled}
        {...register("shippingLastName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.shippingLastName?.message || " "}
      </p>

      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        placeholder="Telefon"
        disabled={shippingDisabled}
        {...register("shippingPhone")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.shippingPhone?.message || " "}
      </p>

      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        placeholder="Ulica i numer"
        disabled={shippingDisabled}
        {...register("shippingStreet")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.shippingStreet?.message || " "}
      </p>

      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        placeholder="Miasto"
        disabled={shippingDisabled}
        {...register("shippingCity")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.shippingCity?.message || " "}
      </p>

      <input
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        placeholder="Kod pocztowy"
        disabled={shippingDisabled}
        {...register("shippingPostcode")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.shippingPostcode?.message || " "}
      </p>
    </section>
  );
}
