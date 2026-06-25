import { z } from "zod";
import { customerSchema } from "./customerSchema";
import { shippingSchema } from "./shippingSchema";
import { paymentSchema } from "./paymentSchema";

export const checkoutSchema = z.object({
  customer: customerSchema,
  shipping: shippingSchema,
  payment: paymentSchema,  
});
