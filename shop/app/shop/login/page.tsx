"use client";

import { useState, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRedirectAfterLogin } from "@/hooks/useRedirectAfterLogin";
import { loginSchema, LoginSchema } from "@/schemas/authSchema";

export default function LoginPage() {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";
  const { redirect } = useRedirectAfterLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      hcaptcha: "",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      const emailInput = document.getElementById(
        "email",
      ) as HTMLInputElement | null;
      const passwordInput = document.getElementById(
        "password",
      ) as HTMLInputElement | null;

      if (emailInput?.value) {
        setValue("email", emailInput.value, { shouldValidate: true });
      }

      if (passwordInput?.value) {
        setValue("password", passwordInput.value, { shouldValidate: true });
      }
    }, 0);
  }, [setValue]);

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // form submit
  const onSubmit = async (data: LoginSchema) => {
    setServerError(null);
    setSuccess(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setServerError(json.message || "Email lub hasło są niepoprawne");
      return;
    }

    setSuccess("Zalogowano pomyślnie!");

    redirect();
  };

  return (
    <form
      className="flex flex-col mt-[120px] py-4 md:p-10 mx-auto max-w-[302px] md:max-w-[500px] justify-center min-h-[calc(100vh-120px)]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
        Zaloguj się
      </h1>
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
      <label htmlFor="password" className="sr-only">
        Hasło
      </label>
      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        type="password"
        id="password"
        placeholder="Hasło"
        {...register("password")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.password ? "opacity-100" : "opacity-0"}`}
      >
        {errors.password?.message || " "}
      </p>
      <HCaptcha
        sitekey={siteKey}
        onVerify={(token) => setValue("hcaptcha", token)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.hcaptcha ? "opacity-100" : "opacity-0"}`}
      >
        {errors.hcaptcha?.message || " "}
      </p>

      <button
        className={`${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"} mt-2 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logowanie..." : "Zaloguj się"}
      </button>

      <p
        className={`text-sm ${serverError ? "text-[var(--out-of-stock)]" : "text-[var(--in-stock)]"} h-[18px] text-center md:h-[20px] my-1 md:mb-2 ${serverError || success ? "opacity-100" : "opacity-0"}`}
      >
        {serverError || success}
      </p>

      <div className="flex flex-col text-sm mt-4 justify-center gap-2 text-center">
        <p>
          Nie masz konta?{" "}
          <a
            className="text-[var(--primary-color)] cursor-pointer"
            href="/shop/register"
          >
            Zarejestruj się
          </a>
        </p>
        <p>
          <a
            className="text-[var(--primary-color)] cursor-pointer"
            href="/shop/forgot-password"
          >
            Zapomniałeś hasła?
          </a>
        </p>
      </div>
    </form>
  );
}
