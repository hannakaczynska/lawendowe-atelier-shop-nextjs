import { z } from "zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export type AccountSchema = z.infer<typeof accountSchema>;

export interface AccountProps {
  register: UseFormRegister<AccountSchema>;
  errors: FieldErrors<AccountSchema>;
}

export const accountSchema = z.object({
  // Account data (WordPress)
  firstName: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(50, "Imię jest za długie")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Imię może zawierać tylko litery"),
  lastName: z
    .string()
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki")
    .max(50, "Nazwisko jest za długie")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Nazwisko może zawierać tylko litery"),
  email: z
    .string()
    .min(1, "Email jest wymagany")
    .max(254, "Email jest za długi")
    .email("Wpisz poprawny email"),

  // Billing (WooCommerce)
  billingFirstName: z
    .string()
    .min(2, "Imię jest wymagane")
    .max(50, "Imię jest za długie")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Imię może zawierać tylko litery"),
  billingLastName: z
    .string()
    .min(2, "Nazwisko jest wymagane")
    .max(50, "Nazwisko jest za długie")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Nazwisko może zawierać tylko litery"),
  billingPhone: z
    .string()
    .regex(/^[0-9]{9}$/, "Numer telefonu musi mieć 9 cyfr"),
  billingEmail: z
    .string()
    .min(1, "Email jest wymagany")
    .max(254, "Email jest za długi")
    .email("Wpisz poprawny email"),
  billingStreet: z.string().min(1, "Ulica lub numer jest wymagana"),
  billingFlat: z.string().optional(),
  billingCity: z
    .string()
    .min(2, "Miasto jest wymagane")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Miasto może zawierać tylko litery"),
  billingPostcode: z
    .string()
    .regex(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie 00-000"),

  // Shipping (WooCommerce)
  shippingSameAsBilling: z.boolean().optional(),
  shippingFirstName: z
    .string()
    .min(2, "Imię jest wymagane")
    .max(50, "Imię jest za długie")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Imię może zawierać tylko litery"),
  shippingLastName: z
    .string()
    .min(2, "Nazwisko jest wymagane")
    .max(50, "Nazwisko jest za długie")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Nazwisko może zawierać tylko litery"),
  shippingPhone: z
    .string()
    .regex(/^[0-9]{9}$/, "Numer telefonu musi mieć 9 cyfr"),
  shippingStreet: z.string().min(1, "Ulica lub numer jest wymagana"),
  shippingFlat: z.string().optional(),
  shippingCity: z
    .string()
    .min(2, "Miasto jest wymagane")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Miasto może zawierać tylko litery"),
  shippingPostcode: z
    .string()
    .regex(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie 00-000"),
});
