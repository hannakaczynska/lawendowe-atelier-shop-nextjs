"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordSchema } from "@/schemas/authSchema";

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "invalid" | "success">("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Pobierz token z URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get("token");
    setToken(t);

    if (!t) {
      setStatus("invalid");
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    if (!token) return;
    console.log("Submitting new password with token:", token, data);

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: data.password }),
    });

    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("invalid");
    }
  };

  if (status === "invalid") {
    return (
      <div className="mt-[120px] text-center">
        <h1 className="text-2xl font-bold mb-4">Nieprawidłowy link</h1>
        <p className="text-sm text-[var(--grey)]">
          Link do resetu hasła jest nieprawidłowy lub wygasł.
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="mt-[120px] text-center">
        <h1 className="text-2xl font-bold mb-4">Hasło zostało zmienione</h1>
        <p className="text-sm text-[var(--grey)] mb-4">
          Możesz teraz zalogować się na swoje konto.
        </p>
        <a
          href="/shop/login"
          className="text-[var(--primary-color)] font-semibold"
        >
          Przejdź do logowania
        </a>
      </div>
    );
  }

  // password reset form
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-[120px] py-4 md:p-10 mx-auto max-w-[310px] md:max-w-[500px] justify-center min-h-[calc(100vh-120px)]"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
        Ustaw nowe hasło
      </h1>

      {/* Password */}
      <label htmlFor="password" className="sr-only">
        Nowe hasło
      </label>
      <div className="relative w-full">
        <input
          className="p-2 pl-3 pr-10 border border-[var(--light-grey)] rounded-md w-full"
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Nowe hasło *"
          {...register("password")}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img
            src={showPassword ? "/eye-closed.svg" : "/eye-open.svg"}
            alt={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
            className="w-5 h-5 cursor-pointer"
          />
        </button>
      </div>

      <p className="text-xs text-[var(--grey)] mt-1">
        Hasło musi zawierać: min. 8 znaków, małą literę, dużą literę i cyfrę.
      </p>

      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${errors.password ? "opacity-100" : "opacity-0"}`}
      >
        {errors.password?.message || " "}
      </p>

      {/* Confirm Password */}
      <div className="relative w-full">
        <label htmlFor="confirmPassword" className="sr-only">
          Powtórz hasło
        </label>
        <input
          className="p-2 pl-3 pr-10 border border-[var(--light-grey)] rounded-md w-full"
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          placeholder="Powtórz hasło *"
          {...register("confirmPassword")}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <img
            src={showConfirmPassword ? "/eye-closed.svg" : "/eye-open.svg"}
            alt={showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"}
            className="w-5 h-5 cursor-pointer"
          />
        </button>
      </div>

      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${
          errors.confirmPassword ? "opacity-100" : "opacity-0"
        }`}
      >
        {errors.confirmPassword?.message || " "}
      </p>

      {/* Submit */}
      <button
        className={`${
          isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
        } mt-2 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Zapisywanie..." : "Zmień hasło"}
      </button>
    </form>
  );
}
