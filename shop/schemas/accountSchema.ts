import { z } from "zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export type AccountSchema = z.infer<typeof accountSchema>;

export interface AccountProps {
  register: UseFormRegister<AccountSchema>;
  errors: FieldErrors<AccountSchema>;
}

export const accountSchema = z.object({
  // Dane konta (WordPress)
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),

  // Billing (WooCommerce)
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingPhone: z.string().optional(),
  billingStreet: z.string().optional(),
  billingCity: z.string().optional(),
  billingPostcode: z.string().optional(),

  // Shipping (WooCommerce)
  shippingSameAsBilling: z.boolean().optional(),
  shippingFirstName: z.string().optional(),
  shippingLastName: z.string().optional(),
  shippingPhone: z.string().optional(),
  shippingStreet: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingPostcode: z.string().optional(),
});