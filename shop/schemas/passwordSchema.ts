import { z } from "zod";

export const passwordSchema = z
  .object({
    current_password: z.string().min(1, "Wpisz aktualne hasło."),
    new_password: z
      .string()
      .min(1, "Hasło jest wymagane")
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .max(128, "Hasło jest za długie")
      .regex(/[a-z]/, "Hasło musi zawierać małą literę")
      .regex(/[A-Z]/, "Hasło musi zawierać dużą literę")
      .regex(/[0-9]/, "Hasło musi zawierać cyfrę"),
    confirm_password: z.string().min(1, "Potwierdź hasło"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Hasła nie są takie same.",
    path: ["confirm_password"],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;
