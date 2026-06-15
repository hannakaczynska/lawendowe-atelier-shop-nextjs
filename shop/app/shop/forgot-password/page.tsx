"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/schemas/authSchema";

export default function ForgotPasswordPage() {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      hcaptcha: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setStatus("idle");

    const response = await fetch("/api/request-password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, hcaptcha: data.hcaptcha }),
    });

    if (!response.ok) {
      setError("Wystąpił błąd podczas wysyłania żądania resetu hasła.");
    }
    setStatus("sent");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-[120px] py-4 md:p-10 mx-auto max-w-[310px] md:max-w-[500px] justify-center min-h-[calc(100vh-120px)]"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
        Reset hasła
      </h1>

      <p className="text-sm text-[var(--grey)] mb-4">
        Podaj adres email powiązany z Twoim kontem. Wyślemy Ci link do
        zresetowania hasła.
      </p>

      {/* Email */}
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        type="email"
        id="email"
        placeholder="Email *"
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
        {isSubmitting ? "Wysyłanie..." : "Wyślij link resetujący"}
      </button>

      {/* Message */}
      <p
        className={`text-sm text-[var(--${error === null ? "in-stock" : "out-of-stock"})] h-[18px] text-center md:h-[20px] my-1 md:mb-2 ${
          status === "sent" ? "opacity-100" : "opacity-0"
        }`}
      >
        {error === null
          ? "Jeśli konto istnieje, wysłaliśmy link do resetu hasła."
          : error}
      </p>

      <div className="flex flex-col text-sm mt-4 justify-center gap-2 text-center">
        <p>
          Pamiętasz hasło?{" "}
          <a
            className="text-[var(--primary-color)] cursor-pointer"
            href="/shop/login"
          >
            Zaloguj się
          </a>
        </p>
      </div>
    </form>
  );
}
