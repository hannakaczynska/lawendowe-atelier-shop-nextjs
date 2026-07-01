"use client";

import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";
import FormTextInput from "@/components/elements/FormTextInput";

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

      <div className="w-full lg:flex lg:gap-10 lg:px-8 xl:gap-20 xl:px-10">
        <div className="flex-1">
          <FormTextInput
            label="Imię *"
            id="shippingFirstName"
            register={register}
            error={(errors as any).shippingFirstName}
            disabled={shippingDisabled}
          />

          <FormTextInput
            label="Nazwisko *"
            id="shippingLastName"
            register={register}
            error={(errors as any).shippingLastName}
            disabled={shippingDisabled}
          />
          <FormTextInput
            label="Telefon *"
            id="shippingPhone"
            register={register}
            error={(errors as any).shippingPhone}
            disabled={shippingDisabled}
          />
          <FormTextInput
            label="Ulica i/lub numer *"
            id="shippingStreet"
            register={register}
            error={(errors as any).shippingStreet}
            disabled={shippingDisabled}
          />
        </div>

        <div className="flex-1">
          <FormTextInput
            label="Mieszkanie / Apartament"
            id="shippingFlat"
            register={register}
            error={(errors as any).shippingFlat}
            disabled={shippingDisabled}
          />
          <FormTextInput
            label="Miasto *"
            id="shippingCity"
            register={register}
            error={(errors as any).shippingCity}
            disabled={shippingDisabled}
          />
          <FormTextInput
            label="Kod pocztowy *"
            id="shippingPostcode"
            register={register}
            error={(errors as any).shippingPostcode}
            disabled={shippingDisabled}
          />
        </div>
      </div>
    </section>
  );
}
