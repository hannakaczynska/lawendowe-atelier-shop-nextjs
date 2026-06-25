import { z } from "zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export type CustomerSchema = z.infer<typeof customerSchema>;

export interface CustomerProps {
  register: UseFormRegister<CustomerSchema>;
  errors: FieldErrors<CustomerSchema>;
}

export const customerSchema = z.object({
  email: z
    .string()
    .min(1, "Email jest wymagany")
    .max(254, "Email jest za długi")
    .email("Wpisz poprawny email"),
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
  billingStreet: z.string().min(1, "Ulica lub numer jest wymagana"),
  billingFlat: z.string().optional(),
  billingCity: z
    .string()
    .min(2, "Miasto jest wymagane")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Miasto może zawierać tylko litery"),
  billingPostcode: z
    .string()
    .regex(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie 00-000"),
});
