"use client";

import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function RegisterPage() {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    consent_regulations: false,
    consent_marketing: false,
    hcaptcha: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Registration response:", data);

    if (!res.ok) {
      setError(data.message || "Błąd rejestracji");
      return;
    }

    setSuccess("Konto utworzone — możesz się zalogować");
  };

  return (
    <form
      className="flex flex-col gap-4 mt-[120px] mx-auto max-w-[800px]"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        type="password"
        placeholder="Hasło"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />

      <input
        placeholder="Imię"
        value={form.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
      />

      <input
        placeholder="Nazwisko"
        value={form.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
      />

      <input
        placeholder="Telefon"
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={form.consent_regulations}
          onChange={(e) =>
            handleChange("consent_regulations", e.target.checked)
          }
        />
        Akceptuję regulamin
      </label>

      <label>
        <input
          type="checkbox"
          checked={form.consent_marketing}
          onChange={(e) => handleChange("consent_marketing", e.target.checked)}
        />
        Zgadzam się na otrzymywanie informacji marketingowych
      </label>

      <HCaptcha
        sitekey={siteKey}
        onVerify={(token) => setForm((prev) => ({ ...prev, hcaptcha: token }))}
      />

      <button type="submit">Załóż konto</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}
