"use client";
import { AccountProps } from "@/schemas/accountSchema";

interface ShippingAddressProps extends AccountProps {
  shippingDisabled: boolean | undefined;
}

export function AccountShippingAddress({
  register,
  errors,
  shippingDisabled,
}: ShippingAddressProps) {
  return (
    <section className="mb-10 w-full">
      <h2 className="text-xl font-semibold mb-4">Adres dostawy</h2>

      <label className="flex items-center gap-2 mb-4 cursor-pointer">
        <input
          type="checkbox"
          className="accent-[var(--in-stock)]"
          {...register("shippingSameAsBilling")}
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
        {...register("shippingFirstName")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingFirstName ? "opacity-100" : "opacity-0"}`}
      >
        {errors.shippingFirstName?.message || " "}
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
        {...register("shippingLastName")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingLastName ? "opacity-100" : "opacity-0"}`}
      >
        {errors.shippingLastName?.message || " "}
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
        {...register("shippingPhone")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingPhone ? "opacity-100" : "opacity-0"}`}
      >
        {errors.shippingPhone?.message || " "}
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
        {...register("shippingStreet")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingStreet ? "opacity-100" : "opacity-0"}`}
      >
        {errors.shippingStreet?.message || " "}
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
        {...register("shippingFlat")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingFlat ? "opacity-100" : "opacity-0"}`}
      >
        {errors.shippingFlat?.message || " "}
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
        {...register("shippingCity")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingCity ? "opacity-100" : "opacity-0"}`}
      >
        {errors.shippingCity?.message || " "}
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
        {...register("shippingPostcode")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.shippingPostcode ? "opacity-100" : "opacity-0"}`}
      >
        {errors.shippingPostcode?.message || " "}
      </p>
    </section>
  );
}
