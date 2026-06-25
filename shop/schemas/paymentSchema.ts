import { z } from "zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export type PaymentSchema = z.infer<typeof paymentSchema>;

export interface PaymentProps {
  register: UseFormRegister<PaymentSchema>;
  errors: FieldErrors<PaymentSchema>;
}

export const paymentSchema = z.object({
    paymentMethod: z.enum(["blik", "card", "transfer"]).refine((val) => !!val, {
    message: "Wybierz metodę płatności",
  }),
})