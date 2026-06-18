"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/schemas/accountSchema";

import { useAuthFetch } from "@/hooks/useAuthFetch";

import { AccountPersonalData } from "@/components/shop/account/details/AccountPersonalData";
import { AccountBillingAddress } from "@/components/shop/account/details/AccountBilingAddress";
import { AccountShippingAddress } from "@/components/shop/account/details/AccountShippingAdress";

import {
  createDefaultValues,
  copyBillingToShipping,
  clearShipping,
} from "@/lib/utils/accountHelpers";
import { mapWooToForm } from "@/lib/wooAccountMapper";
import { AccountFormData } from "@/types/account";

export default function AccountPage() {
  const authFetch = useAuthFetch();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [initialData, setInitialData] = useState<AccountFormData | null>(null);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: createDefaultValues(),
  });

  const watched = watch();
  const shippingDisabled = watched.shippingSameAsBilling;
  const hasChanges =
    initialData && JSON.stringify(watched) !== JSON.stringify(initialData);

  useEffect(() => {
    if (initialLoad) return;
    if (!watched.shippingSameAsBilling) return;

    copyBillingToShipping(watched, setValue);
  }, [
    watched.shippingSameAsBilling,
    watched.billingFirstName,
    watched.billingLastName,
    watched.billingPhone,
    watched.billingStreet,
    watched.billingFlat,
    watched.billingCity,
    watched.billingPostcode,
  ]);

  useEffect(() => {
    if (initialLoad) return;
    if (watched.shippingSameAsBilling) return;

    clearShipping(setValue);
  }, [watched.shippingSameAsBilling]);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await authFetch("/api/account/details");

        if (!res.ok) return;

        const data = await res.json();

        console.log("Dane użytkownika:", data);

        const formData = mapWooToForm(data);

        reset(formData);
        setInitialData(formData);
        setInitialLoad(false);
      } catch (err) {
        console.error("Błąd:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const onSubmit = (data) => {
    console.log("Wysyłamy dane:", data);
  };

  if (loading) {
    return <div className="p-10 animate-pulse">Loading...</div>;
  }

  return (
    <form
      className="flex flex-col py-4 md:p-10 mx-auto max-w-[500px] justify-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Moje konto
      </h1>

      <AccountPersonalData register={register} errors={errors} />

      <AccountBillingAddress register={register} errors={errors} />

      <AccountShippingAddress
        register={register}
        errors={errors}
        shippingDisabled={shippingDisabled}
      />

      <button
        type="submit"
        disabled={!hasChanges}
        className={`w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl transition-colors duration-300
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
