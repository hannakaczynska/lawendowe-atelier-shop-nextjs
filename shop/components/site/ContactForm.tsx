"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { contactSchema, ContactSchema } from "@/schemas/contactSchema";

export default function ContactForm({
  topic,
}: {
  topic: "question" | "notify";
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      topic: topic,
    },
  });

  const captchaRef = useRef<HCaptcha>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";

  const selectedTopic = watch("topic");

  const onSubmit = async (data: ContactSchema) => {
    setServerError(null);
    setSuccess(null);
    console.log("Contact form submitted:", data);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      setServerError(
        json.message || "Wystąpił błąd podczas wysyłania wiadomości",
      );
      captchaRef.current?.resetCaptcha();
      setValue("hcaptcha", "");
      return;
    }

    setSuccess(json.message || "Wiadomość została wysłana");
  };

  return (
    <form
      className="flex flex-col py-4 md:p-10 mx-auto max-w-[300px] md:max-w-[380px] justify-center text-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Napisz do nas
      </h1>

      {/* Imię */}
      <label htmlFor="name" className="sr-only">
        Imię
      </label>
      <input
        className="p-1.5 pl-2 border border-[var(--light-grey)] rounded-md"
        type="text"
        id="name"
        placeholder="Imię"
        {...register("name")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[16px] my-1 ${errors.name ? "opacity-100" : "opacity-0"}`}
      >
        {errors.name?.message || " "}
      </p>

      {/* Email */}
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        className="p-1.5 pl-2 border border-[var(--light-grey)] rounded-md"
        type="email"
        id="email"
        placeholder="Email"
        {...register("email")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[16px] my-1 ${errors.email ? "opacity-100" : "opacity-0"}`}
      >
        {errors.email?.message || " "}
      </p>

      {/* Select */}
      <label htmlFor="topic" className="sr-only">
        Temat
      </label>
      <select
        id="topic"
        className="p-1.5 pl-2 pr-8 cursor-pointer appearance-none border border-[var(--light-grey)] bg-no-repeat bg-[right_0.5rem_center] rounded-md"
        style={{ backgroundImage: "url('/caret-down-black.svg')" }}
        {...register("topic")}
      >
        <option value="question">Mam pytanie</option>
        <option value="notify">Powiadom mnie, gdy sklep ruszy</option>
      </select>
      <p className="text-xs text-[var(--out-of-stock)] h-[16px] my-1 opacity-0">
        {" "}
      </p>

      {/* Wiadomość */}
      {selectedTopic === "question" && (
        <>
          <label htmlFor="message" className="sr-only">
            Wiadomość
          </label>
          <textarea
            id="message"
            placeholder="Twoja wiadomość..."
            className="p-1.5 pl-2 border border-[var(--light-grey)] rounded-md min-h-[90px]"
            {...register("message")}
          />
          <p
            className={`text-xs text-[var(--out-of-stock)] h-[16px] my-1 ${errors.message ? "opacity-100" : "opacity-0"}`}
          >
            {errors.message?.message || " "}
          </p>
        </>
      )}

      <HCaptcha
        ref={captchaRef}
        sitekey={siteKey}
        onVerify={(token) => setValue("hcaptcha", token)}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[16px] my-1 ${errors.hcaptcha ? "opacity-100" : "opacity-0"}`}
      >
        {errors.hcaptcha?.message || " "}
      </p>

      {/* Checkbox notify */}
      {selectedTopic === "question" && (
        <label className="flex items-center gap-2 text-xs mt-1 cursor-pointer">
          <input
            type="checkbox"
            className="accent-[var(--in-stock)] cursor-pointer"
            {...register("shopNotify")}
          />
          <span>Powiadom mnie kiedy sklep ruszy (opcjonalnie)</span>
        </label>
      )}

      {/* Checkbox RODO */}
      <label className="flex items-center gap-2 text-xs mt-2 cursor-pointer">
        <input
          type="checkbox"
          className="accent-[var(--in-stock)] cursor-pointer"
          {...register("rodo")}
        />
        <span>
          Wyrażam zgodę na przetwarzanie danych w celu kontaktu lub
          powiadomienia o starcie sklepu.
        </span>
      </label>
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[16px] my-1 ${errors.rodo ? "opacity-100" : "opacity-0"}`}
      >
        {errors.rodo?.message || " "}
      </p>

      {/* Submit */}
      <button
        className={`${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"} mt-3 w-[160px] md:w-[240px] mx-auto font-semibold py-2 px-3 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>

      <p
        className={`text-xs ${serverError ? "text-[var(--out-of-stock)]" : "text-[var(--in-stock)]"} h-[16px] text-center my-1 ${serverError || success ? "opacity-100" : "opacity-0"}`}
      >
        {serverError || success}
      </p>
    </form>
  );
}
