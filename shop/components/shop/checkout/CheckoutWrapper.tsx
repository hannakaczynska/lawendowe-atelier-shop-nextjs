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
import CheckoutTotal from "./CheckoutTotal";

export type Step = 1 | 2 | 3 | 4;

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

  const onSubmit = () => {
    setStep(4);
  };

  return (
    <div className="flex flex-col gap-4 w-full mx-auto px-4 lg:px-10 ">
      <CheckoutStepsNav step={step} />

      <div className="flex-1 flex flex-col md:flex-row space-between md:gap-20 lg:gap-10 xl:gap-20">
        {/* LEFT SIDE */}
        <form className="w-full max-w-[500px] md:max-w-none flex-1 shrink-1 mx-auto">
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
        {step !== 4 && (
          <div className="w-full max-w-[500px] sm:min-w-[300px] md:max-w-[300px] lg:max-w-[300px] xl:max-w-[350px] mx-auto mt-12">
            <CheckoutTotal step={step} watch={watch} />
          </div>
        )}
      </div>

      {/* summary */}
      {step === 4 && (
        <div className="w-full ">
          <CheckoutSummary />
        </div>
      )}

    </div>
  );
}
