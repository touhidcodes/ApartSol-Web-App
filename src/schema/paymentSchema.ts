import { z } from "zod";

export const paymentBillingSchema = z.object({
  billingName: z.string().min(1, "Full name is required"),
  billingEmail: z.string().email("Invalid email"),
  billingPhone: z.string().min(6, "Phone is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});
