"use client";

import { useState } from "react";

export default function CheckoutForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    note: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("ORDER DATA:", form);

    // tu później: API call
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dane kontaktowe</h2>

      <input
        name="firstName"
        placeholder="Imię"
        onChange={handleChange}
      />

      <input
        name="lastName"
        placeholder="Nazwisko"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Telefon"
        onChange={handleChange}
      />

      <textarea
        name="note"
        placeholder="Uwagi"
        onChange={handleChange}
      />

      <button type="submit">
        Przejdź do płatności
      </button>
    </form>
  );
}