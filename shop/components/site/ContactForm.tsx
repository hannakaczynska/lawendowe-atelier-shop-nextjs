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
      className="flex flex-col mt-[120px] py-4 md:p-10 mx-auto max-w-[302px] md:max-w-[500px] justify-center min-h-[calc(100vh-120px)]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10">
        Skontaktuj się z nami
      </h1>

      <label htmlFor="name" className="sr-only">
        Imię
      </label>
      <input
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        type="text"
        id="name"
        placeholder="Imię"
        {...register("name")}
      />
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${
          errors.name ? "opacity-100" : "opacity-0"
        }`}
      >
        {errors.name?.message || " "}
      </p>

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
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${
          errors.email ? "opacity-100" : "opacity-0"
        }`}
      >
        {errors.email?.message || " "}
      </p>

      <label htmlFor="topic" className="sr-only">
        Temat
      </label>
      <select
        id="topic"
        className="p-2 pl-3 border border-[var(--light-grey)] rounded-md"
        {...register("topic")}
      >
        <option value="question">Mam pytanie</option>
        <option value="notify">Powiadom mnie, gdy sklep ruszy</option>
      </select>
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 opacity-0">
        {" "}
      </p>

      {selectedTopic === "question" && (
        <>
          <label htmlFor="message" className="sr-only">
            Wiadomość
          </label>
          <textarea
            id="message"
            placeholder="Twoja wiadomość..."
            className="p-2 pl-3 border border-[var(--light-grey)] rounded-md min-h-[120px]"
            {...register("message")}
          />
          <p
            className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${
              errors.message ? "opacity-100" : "opacity-0"
            }`}
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
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${
          errors.hcaptcha ? "opacity-100" : "opacity-0"
        }`}
      >
        {errors.hcaptcha?.message || " "}
      </p>

      <label className="flex items-start gap-2 text-sm mt-2">
        <input
          type="checkbox"
          {...register("rodo", {
            required: "Musisz wyrazić zgodę na przetwarzanie danych",
          })}
        />
        <span>
          Wyrażam zgodę na przetwarzanie danych w celu kontaktu lub
          powiadomienia o starcie sklepu.
        </span>
      </label>
      <p
        className={`text-xs text-[var(--out-of-stock)] h-[18px] md:h-[20px] my-1 md:mb-2 ${
          errors.rodo ? "opacity-100" : "opacity-0"
        }`}
      >
        {errors.rodo?.message || " "}
      </p>

      {/* Submit */}
      <button
        className={`${
          isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
        } mt-4 w-[200px] md:w-[300px] mx-auto font-bold py-3 px-4 md:py-4 md:px-6 rounded-4xl bg-[var(--secondary-color)] hover:text-white hover:bg-[var(--primary-color)] transition-colors duration-300`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
      <p
        className={`text-sm ${serverError ? "text-[var(--out-of-stock)]" : "text-[var(--in-stock)]"} h-[18px] text-center md:h-[20px] my-1 md:mb-2 ${serverError || success ? "opacity-100" : "opacity-0"}`}
      >
        {serverError || success}
      </p>
    </form>
  );
}
