import { z } from "zod";

const contactSchemaBase = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(50, "Imię jest za długie")
    .regex(/^[A-Za-zÀ-ž\- ]+$/, "Imię może zawierać tylko litery"),
  email: z
    .string()
    .min(1, "Email jest wymagany")
    .max(254, "Email jest za długi")
    .email("Wpisz poprawny email"),
  hcaptcha: z.string().min(1, "Potwierdź, że jesteś człowiekiem"),
  rodo: z.boolean().refine((val) => val === true, {
    message: "Musisz wyrazić zgodę na przetwarzanie danych",
  }),
});

const questionContactSchema = contactSchemaBase.extend({
  topic: z.literal("question"),
  message: z
    .string()
    .trim()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
});

const notifyContactSchema = contactSchemaBase.extend({
  topic: z.literal("notify"),
  message: z.string().optional(),
});

export const contactSchema = z.discriminatedUnion("topic", [
  questionContactSchema,
  notifyContactSchema,
]);

export type ContactSchema = z.infer<typeof contactSchema>;
