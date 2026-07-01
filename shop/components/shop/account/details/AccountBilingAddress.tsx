"use client";
import { AccountProps } from "@/schemas/accountSchema";
import FormTextInput from "@/components/elements/FormTextInput";

export function AccountBillingAddress({ register, errors }: AccountProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Adres kupującego</h2>

      <div className="w-full lg:flex lg:gap-20 lg:px-10">
        <div className="flex-1">
          <FormTextInput
            label="Imię *"
            id="billingFirstName"
            register={register}
            error={errors.billingFirstName}
          />
          <FormTextInput
            label="Nazwisko *"
            id="billingLastName"
            register={register}
            error={errors.billingLastName}
          />
          <FormTextInput
            label="Email *"
            id="billingEmail"
            register={register}
            error={errors.billingEmail}
          />
          <FormTextInput
            label="Telefon *"
            id="billingPhone"
            register={register}
            error={errors.billingPhone}
          />
        </div>

        <div className="flex-1">
          <FormTextInput
            label="Ulica i/lub numer *"
            id="billingStreet"
            register={register}
            error={errors.billingStreet}
          />
          <FormTextInput
            label="Mieszkanie / Apartament"
            id="billingFlat"
            register={register}
            error={errors.billingFlat}
          />
          <FormTextInput
            label="Miasto *"
            id="billingCity"
            register={register}
            error={errors.billingCity}
          />
          <FormTextInput
            label="Kod pocztowy *"
            id="billingPostcode"
            register={register}
            error={errors.billingPostcode}
          />
        </div>
      </div>
    </section>
  );
}
