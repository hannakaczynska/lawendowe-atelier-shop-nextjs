"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { resendEmailSchema, ResendEmailSchema } from "@/schemas/authSchema";

export default function ResendVerificationPage() {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResendEmailSchema>({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: {
      email: "",
      hcaptcha: "",
    },
  });

  const onSubmit = async (data: ResendEmailSchema) => {
    setStatus("idle");
    await fetch("/api/resend-verification-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, hcaptcha: data.hcaptcha }),
    });

    setStatus("sent");
  };

  return (
    <div className="mt-[120px] mx-auto max-w-[310px] md:max-w-[500px] mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col py-4 md:p-10 justify-center min-h-[calc(100vh-120px)]"
      >
        <h1 className="text-2xl font-bold mb-6 md:mb-10">
          Wyślij ponownie link aktywacyjny
        </h1>
        {/* Email */}
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />
        <p
          className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.email ? "opacity-100" : "opacity-0"}`}
        >
          {errors.email?.message || " "}
        </p>

        {/* Captcha */}
        <div className="mt-4">
          <HCaptcha
            sitekey={siteKey}
            onVerify={(token) => setValue("hcaptcha", token)}
          />
        </div>
        <p
          className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] ${errors.hcaptcha ? "opacity-100" : "opacity-0"}`}
        >
          {errors.hcaptcha?.message || " "}
        </p>

        {/* Submit */}
        <button
          className={`${
            isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
          } mt-2 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wysyłanie..." : "Wyślij ponownie"}
        </button>
        {status === "sent" && !isSubmitting && (
          <p
            className={`text-sm text-[var(--in-stock)] h-[18px] px-4 text-center md:h-[20px] my-1 md:mb-2 ${
              status === "sent" ? "opacity-100" : "opacity-0"
            }`}
          >
            Jeśli konto istnieje i nie jest zweryfikowane, wysłaliśmy nowy link.
          </p>
        )}
      </form>
    </div>
  );
}
