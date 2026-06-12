"use client";

import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRedirectAfterLogin } from "@/hooks/useRedirectAfterLogin";
import { registerSchema, RegisterSchema } from "@/schemas/authSchema";

export default function RegisterPage() {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";
  const { redirect } = useRedirectAfterLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      consent_regulations: false,
      consent_marketing: false,
      hcaptcha: "",
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Submit
  const onSubmit = async (data: RegisterSchema) => {
    setServerError(null);
    setSuccess(null);
    console.log("HALOOO!!!");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setServerError(json.message || "Wystąpił błąd podczas rejestracji");
      return;
    }

    setSuccess("Konto zostało utworzone!");

    redirect();
  };

  return (
    <form
      className="flex flex-col mt-[120px] py-4 md:p-10 mx-auto max-w-[310px] md:max-w-[500px] justify-center min-h-[calc(100vh-120px)]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
        Zarejestruj się
      </h1>

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

      {/* Password */}
      <label htmlFor="password" className="sr-only">
        Hasło
      </label>
      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        type="password"
        id="password"
        placeholder="Hasło *"
        {...register("password")}
      />
      <p className="text-xs text-[var(--grey)] mt-1">
        Hasło musi zawierać: min. 8 znaków, małą literę, dużą literę i cyfrę.
      </p>
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.password ? "opacity-100" : "opacity-0"}`}
      >
        {errors.password?.message || " "}
      </p>

      {/* Confirm Password */}
      <label htmlFor="confirmPassword" className="sr-only">
        Potwierdź hasło
      </label>
      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        type="password"
        id="confirmPassword"
        placeholder="Potwierdź hasło *"
        {...register("confirmPassword")}
      />

      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${
          errors.confirmPassword ? "opacity-100" : "opacity-0"
        }`}
      >
        {errors.confirmPassword?.message || " "}
      </p>

      {/* First Name */}
      <label htmlFor="firstName" className="sr-only">
        Imię
      </label>
      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        type="text"
        id="firstName"
        placeholder="Imię *"
        {...register("firstName")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.firstName ? "opacity-100" : "opacity-0"}`}
      >
        {errors.firstName?.message || " "}
      </p>

      {/* Last Name */}
      <label htmlFor="lastName" className="sr-only">
        Nazwisko
      </label>
      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        type="text"
        id="lastName"
        placeholder="Nazwisko *"
        {...register("lastName")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.lastName ? "opacity-100" : "opacity-0"}`}
      >
        {errors.lastName?.message || " "}
      </p>

      {/* Regulations */}
      <label className="flex items-center gap-2 text-sm mt-2 cursor-pointer">
        <input
          type="checkbox"
          className="accent-[var(--in-stock)] cursor-pointer"
          {...register("consent_regulations")}
        />
        <span>
          Akceptuję regulamin sklepu oraz zapoznałem/am się z polityką
          prywatności *
        </span>
      </label>
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] ${errors.consent_regulations ? "opacity-100" : "opacity-0"}`}
      >
        {errors.consent_regulations?.message || " "}
      </p>

      {/* Marketing */}
      <label className="flex items-center gap-2 text-sm mt-1 cursor-pointer">
        <input
          type="checkbox"
          className="accent-[var(--in-stock)] cursor-pointer"
          {...register("consent_marketing")}
        />
        <span>Zgadzam się na komunikację marketingową (opcjonalnie)</span>
      </label>

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
        className={`${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"} mt-2 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Rejestracja..." : "Zarejestruj się"}
      </button>

      {/* Server messages */}
      <p
        className={`text-sm ${serverError ? "text-[var(--out-of-stock)]" : "text-[var(--in-stock)]"} h-[18px] text-center md:h-[20px] my-1 md:mb-2 ${serverError || success ? "opacity-100" : "opacity-0"}`}
      >
        {serverError || success}
      </p>

      <div className="flex flex-col text-sm mt-4 justify-center gap-2 text-center">
        <p>
          Masz już konto?{" "}
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

