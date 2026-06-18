"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/schemas/accountSchema";

import { useAuthFetch } from "@/hooks/useAuthFetch";

import { AccountPersonalData } from "@/components/shop/account/details/AccountPersonalData";
import { AccountBillingAddress } from "@/components/shop/account/details/AccountBilingAddress";
import { AccountShippingAddress } from "@/components/shop/account/details/AccountShippingAdress";

export default function AccountPage() {
  const authFetch = useAuthFetch();
  const [loading, setLoading] = useState(true);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",

      billingFirstName: "",
      billingLastName: "",
      billingPhone: "",
      billingStreet: "",
      billingCity: "",
      billingPostcode: "",

      shippingSameAsBilling: true,
      shippingFirstName: "",
      shippingLastName: "",
      shippingPhone: "",
      shippingStreet: "",
      shippingCity: "",
      shippingPostcode: "",
    },
  });

  const watched = watch();
  const shippingDisabled = watched.shippingSameAsBilling;
  const hasChanges = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await authFetch("/api/account/details");

        if (!res.ok) return;

        const data = await res.json();

        reset({
          // Dane konta
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",

          // Billing
          billingFirstName: data.billing?.first_name || "",
          billingLastName: data.billing?.last_name || "",
          billingPhone: data.billing?.phone || "",
          billingStreet: data.billing?.address_1 || "",
          billingCity: data.billing?.city || "",
          billingPostcode: data.billing?.postcode || "",

          // Shipping
          shippingSameAsBilling:
            JSON.stringify(data.billing) === JSON.stringify(data.shipping),

          shippingFirstName: data.shipping?.first_name || "",
          shippingLastName: data.shipping?.last_name || "",
          shippingPhone: data.shipping?.phone || "",
          shippingStreet: data.shipping?.address_1 || "",
          shippingCity: data.shipping?.city || "",
          shippingPostcode: data.shipping?.postcode || "",
        });
      } catch (err) {
        console.error("Błąd:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return <div className="p-10 animate-pulse">Loading...</div>;
  }

  const onSubmit = (data) => {
    console.log("Wysyłamy dane:", data);
  };

  return (
    <form
      className="flex flex-col py-4 md:p-10 mx-auto max-w-[500px] justify-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Moje konto</h1>

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
