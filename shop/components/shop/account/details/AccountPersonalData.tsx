"use client";
import FormTextInput from "@/components/elements/FormTextInput";
import { AccountProps } from "@/schemas/accountSchema";

export function AccountPersonalData({ register, errors }: AccountProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Dane konta</h2>

      <div className="lg:w-1/2 lg:px-10">
        <FormTextInput
          label="Imię *"
          id="firstName"
          register={register}
          error={errors.firstName}
        />
        <FormTextInput
          label="Nazwisko *"
          id="lastName"
          register={register}
          error={errors.lastName}
        />
        <FormTextInput
          label="Email (tylko do odczytu)"
          id="email"
          register={register}
          error={errors.email}
          disabled
        />
      </div>
    </section>
  );
}
