"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapWooToForm } from "@/lib/wooAccountMapper";
import { useAuthFetch } from "@/hooks/useAuthFetch";

import { checkoutSchema } from "@/schemas/checkoutSchema";
import { CheckoutStepsNav } from "./CheckoutStepsNav";
import { CheckoutCustomerData } from "./CheckoutCustomerData";
import CheckoutAddressDelivery from "./CheckoutAddressDelivery";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutSummary from "./CheckoutSummary";
import { useUser } from "@/context/UserContext";

export type Step = 1 | 2 | 3;

export function CheckoutWrapper() {
  const { authenticated, userId } = useUser();
  const [step, setStep] = useState<Step>(1);
  const [initialLoad, setInitialLoad] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      billingFirstName: "",
      billingLastName: "",
      billingPhone: "",
      billingStreet: "",
      billingFlat: "",
      billingCity: "",
      billingPostcode: "",
      deliveryMethod: "pickup",
    },
  });

  const authFetch = useAuthFetch();

  useEffect(() => {
    if (!authenticated || !userId) {
      setInitialLoad(false);
      return;
    }

    async function loadUser() {
      try {
        const res = await authFetch("/api/account/details");

        if (!res.ok) {
          setInitialLoad(false);
          return;
        }

        const data = await res.json();

        const formData = mapWooToForm(data);

        reset(formData);
        setInitialLoad(false);
      } catch (err) {
        console.error("Błąd:", err);
        setInitialLoad(false);
      }
    }
    loadUser();
  }, [authenticated, userId]);

  const onSubmit = (data) => {
    console.log("FINAL CHECKOUT DATA:", data);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 max-w-[1100px] mx-auto py-10 px-4">
      {/* LEWA STRONA */}
      <div className="flex-1 max-w-[600px] mx-auto">
        <CheckoutStepsNav step={step} setStep={setStep} />

        {step === 1 && (
          <CheckoutCustomerData
            register={register}
            errors={errors}
            setStep={setStep}
          />
        )}

        {step === 2 && (
          <CheckoutAddressDelivery
            register={register}
            errors={errors}
            setStep={setStep}
            watch={watch}
            setValue={setValue}
          />
        )}

        {step === 3 && (
          <CheckoutPayment
            register={register}
            errors={errors}
            setStep={setStep}
            onSubmit={handleSubmit(onSubmit)}
          />
        )}
      </div>

      {/* PRAWA STRONA */}
      <div className="w-full md:w-[350px]">
        <CheckoutSummary />
      </div>
    </div>
  );
}
