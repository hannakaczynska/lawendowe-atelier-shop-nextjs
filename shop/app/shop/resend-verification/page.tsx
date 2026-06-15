"use client";

import { useState } from "react";

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    await fetch("/api/resend-verification-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setIsSubmitting(false);
    setStatus("sent");
  };

  return (
    <div className="mt-[120px] mx-auto max-w-[310px] md:max-w-[500px] mx-auto  text-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col py-4 md:p-10 justify-center min-h-[calc(100vh-120px)] gap-4"
      >
        <h1 className="text-2xl font-bold mb-4">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
