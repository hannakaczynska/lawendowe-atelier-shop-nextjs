"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapWooToForm } from "@/lib/wooAccountMapper";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useAccountInitialData } from "@/store/checkout";

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
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      deliveryMethod: "pickup",
      saveBilling: false,
      saveShipping: false,
    },
  });

  const authFetch = useAuthFetch();
  const { setInitialData, clearInitialData } = useAccountInitialData();

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {
    const subscription = watch((value) => {
      sessionStorage.setItem("checkout-data", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!authenticated) {
      reset({});
    }
  }, [authenticated]);

  // Load user data from API if authenticated and no saved data in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("checkout-data");

    if (saved) {
      reset(JSON.parse(saved));
      setInitialLoad(false);
      return;
    }

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
        setInitialData(formData);
        setInitialLoad(false);
      } catch (err) {
        console.error("Błąd:", err);
        setInitialLoad(false);
      }
    }

    loadUser();
  }, [authenticated, userId, reset]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("checkout-data");
      clearInitialData();
    };
  }, []);

  const onSubmit = (data: any) => {
    console.log("FINAL CHECKOUT DATA:", data);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 max-w-[1100px] mx-auto py-10 px-4">
      {/* LEFT SIDE */}
      <form className="flex-1 max-w-[600px] mx-auto">
        <CheckoutStepsNav step={step} setStep={setStep} />

        {step === 1 && (
          <CheckoutCustomerData
            register={register}
            errors={errors}
            trigger={trigger}
            getValues={getValues}
            watch={watch}
            setStep={setStep}
          />
        )}

        {step === 2 && (
          <CheckoutAddressDelivery
            register={register}
            errors={errors}
            setStep={setStep}
            trigger={trigger}
            getValues={getValues}
            watch={watch}
            setValue={setValue}
          />
        )}

        {step === 3 && (
          <CheckoutPayment
            register={register}
            errors={errors}
            trigger={trigger}
            setStep={setStep}
            onSubmit={handleSubmit(onSubmit)}
          />
        )}
      </form>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[350px]">
        <CheckoutSummary />
      </div>
    </div>
  );
}
