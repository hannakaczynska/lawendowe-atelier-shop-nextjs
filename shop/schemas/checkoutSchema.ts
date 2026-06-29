import { z } from "zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

export interface CheckoutProps {
  register: UseFormRegister<CheckoutSchema>;
  errors: FieldErrors<CheckoutSchema>;
  trigger: (fields?: (keyof CheckoutSchema)[]) => Promise<boolean>;
}

export const checkoutSchema = z.object({
  // Customer data
  billingEmail: z
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
  saveBilling: z.boolean().optional(),

  // Shipping data
  deliveryMethod: z.enum(["pickup", "local"]).refine((val) => !!val, {
    message: "Wybierz metodę dostawy",
  }),
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
    saveShipping: z.boolean().optional(),

  //payment data
  paymentMethod: z.enum(["blik", "card", "transfer"]),
});
