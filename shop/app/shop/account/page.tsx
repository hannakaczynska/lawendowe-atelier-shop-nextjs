"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  // Dane osobowe
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),

  // Adres kupującego
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  billingPostcode: z.string().optional(),

  // Adres wysyłki
  shippingSameAsBilling: z.boolean().optional(),
  shippingStreet: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingPostcode: z.string().optional(),
});

export default function AccountPage() {
  const [isDirty, setIsDirty] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      billingStreet: "",
      billingCity: "",
      billingPostcode: "",
      shippingSameAsBilling: true,
      shippingStreet: "",
      shippingCity: "",
      shippingPostcode: "",
    },
  });

  // aktywacja przycisku po zmianie jakiegokolwiek pola
  const watched = watch();
  const hasChanges = Object.keys(dirtyFields).length > 0;

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  const shippingDisabled = watched.shippingSameAsBilling;

  return (
    <form
      className="flex flex-col py-4 md:p-10 mx-auto max-w-[500px] justify-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Moje konto
      </h1>

      <h2 className="text-xl font-semibold mb-4">Dane osobowe</h2>

      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        placeholder="Imię"
        {...register("firstName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.firstName?.message || " "}
      </p>

      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        placeholder="Nazwisko"
        {...register("lastName")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.lastName?.message || " "}
      </p>

            <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        placeholder="E-mail"
        {...register("email")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.email?.message || " "}
      </p>

      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        placeholder="Telefon"
        {...register("phone")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.phone?.message || " "}
      </p>

      <hr className="my-8 border-gray-200" />

      <h2 className="text-xl font-semibold mb-4">Adres kupującego</h2>

      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        placeholder="Ulica i numer"
        {...register("billingStreet")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingStreet?.message || " "}
      </p>

      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        placeholder="Miasto"
        {...register("billingCity")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingCity?.message || " "}
      </p>

      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        placeholder="Kod pocztowy"
        {...register("billingPostcode")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.billingPostcode?.message || " "}
      </p>

      <hr className="my-8 border-gray-200" />


      <h2 className="text-xl font-semibold mb-4">Adres wysyłki</h2>

      <label className="flex items-center gap-2 mb-4 cursor-pointer">
        <input
          type="checkbox"
          {...register("shippingSameAsBilling")}
        />
        <span className="text-sm">Taki sam jak adres kupującego</span>
      </label>

      <input
        className={`p-2 pl-3 border border-[var(--light-grey)] rounded-md ${
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
        className={`p-2 pl-3 border border-[var(--light-grey)] rounded-md ${
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
        className={`p-2 pl-3 border border-[var(--light-grey)] rounded-md ${
          shippingDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        placeholder="Kod pocztowy"
        disabled={shippingDisabled}
        {...register("shippingPostcode")}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1">
        {errors.shippingPostcode?.message || " "}
      </p>

      <button
        type="submit"
        disabled={!hasChanges}
        className={`mt-6 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl transition-colors duration-300
          ${
            hasChanges
              ? "cursor-pointer bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)]"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }
        `}
      >
        Zaktualizuj dane
      </button>
    </form>
  );
}
