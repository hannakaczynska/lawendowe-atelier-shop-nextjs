import { z } from "zod";

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email jest wymagany").email("Wpisz poprawny email"),
  password: z.string().min(1, "Hasło jest wymagane"),
  hcaptcha: z.string().min(1, "Potwierdź, że jesteś człowiekiem"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
    email: z
      .string()
      .min(1, "Email jest wymagany")
      .email("Wpisz poprawny email"),
    password: z
      .string()
      .min(1, "Hasło jest wymagane")
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .regex(/[a-z]/, "Hasło musi zawierać małą literę")
      .regex(/[A-Z]/, "Hasło musi zawierać dużą literę")
      .regex(/[0-9]/, "Hasło musi zawierać cyfrę"),
    confirmPassword: z.string().min(1, "Potwierdź hasło"),
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
    consent_regulations: z.boolean().refine((val) => val === true, {
      message: "Musisz zaakceptować regulamin",
    }),
    consent_marketing: z.boolean().optional(),
    hcaptcha: z.string().min(1, "Potwierdź, że jesteś człowiekiem"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła muszą być takie same",
  });