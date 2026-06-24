"use client";

import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";
  
  return (
    <div className="flex flex-col mt-[120px] py-4 md:p-10 mx-auto max-w-[310px] md:max-w-[500px] justify-center min-h-[calc(100vh-120px)]">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">
        Potwierdź adres e‑mail
      </h1>

      <p className="text-sm md:text-base text-center text-[var(--grey)] leading-relaxed">
        Dziękujemy za rejestrację w naszym sklepie.  
        Na adres e‑mail <span className="font-semibold text-[var(--primary-color)]">{email}</span> wysłaliśmy wiadomość z linkiem aktywacyjnym.
      </p>

      <p className="text-sm md:text-base text-center text-[var(--grey)] mt-4 leading-relaxed">
        Kliknij w link, aby aktywować swoje konto i móc się zalogować.
      </p>

      <div className="flex flex-col text-sm mt-8 justify-center gap-2 text-center">
        <p>
          Nie otrzymałaś/eś wiadomości?{" "}
          <a
            className="text-[var(--primary-color)] cursor-pointer hover:underline"
            href="/shop/resend-verification"
          >
            Wyślij ponownie
          </a>
        </p>

        <p>
          Masz już konto?{" "}
          <a
            className="text-[var(--primary-color)] cursor-pointer hover:underline"
            href="/shop/login"
          >
            Zaloguj się
          </a>
        </p>
      </div>
    </div>
  );
}
