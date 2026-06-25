import { z } from "zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export type ShippingSchema = z.infer<typeof shippingSchema>;

export interface ShippingProps {
  register: UseFormRegister<ShippingSchema>;
  errors: FieldErrors<ShippingSchema>;
}

export const shippingSchema = z.object({
  deliveryMethod: z.enum(["pickup", "local"]).refine((val) => !!val, {
    message: "Wybierz metodę dostawy",
  }),
  shippingSameAsBilling: z.boolean().optional(),
  email: z
    .string()
    .min(1, "Email jest wymagany")
    .max(254, "Email jest za długi")
    .email("Wpisz poprawny email"),
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
