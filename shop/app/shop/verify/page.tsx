"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      const res = await fetch(`/api/verify-email?token=${token}`);
      const json = await res.json();
      console.log(json.message);

      if (json.success) setStatus("success");
      else setStatus("error");
    };

    verify();
  }, [token]);

  return (
    <div className="flex flex-col mt-[120px] py-4 md:p-10 mx-auto max-w-[500px] text-center">
      {status === "loading" && <p>Weryfikuję adres e‑mail...</p>}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Email zweryfikowany!</h1>
          <p className="text-gray-600 mb-6">
            Twój adres e‑mail został pomyślnie potwierdzony.
          </p>
          <a
            href="/shop/login"
            className="text-primary underline"
          >
            Przejdź do logowania
          </a>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold mb-4">Błąd weryfikacji</h1>
          <p className="text-gray-600 mb-6">
            Link aktywacyjny jest nieprawidłowy lub wygasł.
          </p>
          <a
            href="/shop/resend-verification"
            className="text-primary underline"
          >
            Wyślij link ponownie
          </a>
        </>
      )}
    </div>
  );
}
