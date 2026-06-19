"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordFormData } from "@/schemas/passwordSchema";
import { useState, useEffect } from "react";

export default function PasswordChangeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 3000);
    return () => clearTimeout(t);
  }, [success]);

  async function onSubmit(data: PasswordFormData) {
    const res = await fetch("/api/account/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setServerError(json.error || "Nie udało się zmienić hasła.");
      setSuccess(null);
      return;
    }

    setSuccess("Hasło zostało zmienione.");
    setServerError(null);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-10 mx-auto max-w-[500px] justify-start"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Zmień hasło
      </h1>

      {/* old password */}
      <div className="relative w-full">
        <label htmlFor="current_password" className="sr-only">
          Aktualne hasło
        </label>
        <input
          type={showOldPassword ? "text" : "password"}
          id="current_password"
          placeholder="Aktualne hasło *"
          className="p-2 pl-3 border border-[var(--light-grey)] rounded-md w-full"
          {...register("current_password")}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowOldPassword(!showOldPassword)}
        >
          <img
            src={showOldPassword ? "/eye-closed.svg" : "/eye-open.svg"}
            alt={showOldPassword ? "Ukryj hasło" : "Pokaż hasło"}
            className="w-5 h-5 cursor-pointer"
          />
        </button>
      </div>
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2">
        {errors.current_password?.message || " "}
      </p>

      {/* new password */}
      <div className="relative w-full">
        <label htmlFor="new_password" className="sr-only">
          Nowe hasło
        </label>
        <input
          type={showNewPassword ? "text" : "password"}
          id="new_password"
          placeholder="Nowe hasło *"
          className="p-2 pl-3 pr-10 border border-[var(--light-grey)] rounded-md w-full"
          {...register("new_password")}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          <img
            src={showNewPassword ? "/eye-closed.svg" : "/eye-open.svg"}
            alt={showNewPassword ? "Ukryj hasło" : "Pokaż hasło"}
            className="w-5 h-5 cursor-pointer"
          />
        </button>
      </div>
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2">
        {errors.new_password?.message || " "}
      </p>

      {/* confirm password */}
      <div className="relative w-full">
        <label htmlFor="confirm_password" className="sr-only">
          Powtórz nowe hasło
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirm_password"
          placeholder="Powtórz nowe hasło *"
          className="p-2 pl-3 pr-10 border border-[var(--light-grey)] rounded-md w-full"
          {...register("confirm_password")}
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
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2">
        {errors.confirm_password?.message || " "}
      </p>

      {/* submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"} mt-2 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300`}
      >
        {isSubmitting ? "Zmieniam..." : "Zmień hasło"}
      </button>

      <p
        className={`text-sm ${serverError ? "text-[var(--out-of-stock)]" : "text-[var(--in-stock)]"} h-[18px] text-center md:h-[20px] my-1 md:mb-2 ${serverError || success ? "opacity-100" : "opacity-0"}`}
      >
        {serverError || success}
      </p>
    </form>
  );
}
