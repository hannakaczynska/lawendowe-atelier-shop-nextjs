"use client";
import { AccountProps } from "@/schemas/accountSchema";

export function AccountBillingAddress({ register, errors }: AccountProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Adres kupującego</h2>

      <label
        htmlFor="billingFirstName"
        className="text-[var(--grey)] block mb-1"
      >Imię *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="billingFirstName"
        {...register("billingFirstName")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingFirstName ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingFirstName?.message || " "}
      </p>

      <label
        htmlFor="billingLastName"
        className="text-[var(--grey)] block mb-1"
      >Nazwisko *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="billingLastName"
        {...register("billingLastName")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingLastName ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingLastName?.message || " "}
      </p>

      <label
        htmlFor="billingPhone"
        className="text-[var(--grey)] block mb-1"
      >Telefon *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="billingPhone"
        placeholder="123 456 789"
        {...register("billingPhone")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingPhone ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingPhone?.message || " "}
      </p>

      <label
        htmlFor="billingStreet"
        className="text-[var(--grey)] block mb-1"
      >Ulica i/lub numer *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="billingStreet"
        {...register("billingStreet")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingStreet ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingStreet?.message || " "}
      </p>

      <label
        htmlFor="billingFlat"
        className="text-[var(--grey)] block mb-1"
      >Mieszkanie / Apartament</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="billingFlat"
        {...register("billingFlat")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingFlat ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingFlat?.message || " "}
      </p>

      <label
        htmlFor="billingCity"
        className="text-[var(--grey)] block mb-1"
      >Miasto *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="billingCity"
        {...register("billingCity")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.billingCity ? "opacity-100" : "opacity-0"}`}
      >
        {errors.billingCity?.message || " "}
      </p>

      <label
        htmlFor="billingPostcode"
        className="text-[var(--grey)] block mb-1"
      >Kod pocztowy *</label>
      <input
        className="p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md"
        id="billingPostcode"
        placeholder="00-000"
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
