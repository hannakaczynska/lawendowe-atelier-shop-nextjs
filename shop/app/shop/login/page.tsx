"use client";

import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function LoginPage() {
const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";

  const [form, setForm] = useState({
    email: "",
    password: "",
    hcaptcha: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Błędne dane logowania");
      return;
    }

    setSuccess("Zalogowano pomyślnie!");
  };

  return (
    <form
      className="flex flex-col gap-4 mt-[120px] mx-auto max-w-[400px]"
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

      <HCaptcha
        sitekey={siteKey}
        onVerify={(token) => setForm((prev) => ({ ...prev, hcaptcha: token }))}
      />

      <button type="submit">Zaloguj się</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}
