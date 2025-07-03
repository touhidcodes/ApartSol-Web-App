import { z } from "zod";

export const loginValidationSchema = z.object({
  identifier: z.string({
    required_error: "Please enter a valid username or email address!",
  }),
  password: z.string().min(8, "Must be at least 8 characters"),
});

export const registerValidationSchema = z.object({
  username: z
    .string()
    .min(1, "Please enter your username!")
    .max(10, "Username must be at most 10 characters long"),
  email: z.string().email("Please enter a valid email address!"),
  role: z.enum(["AGENT", "USER"], {
    required_error: "Registration type is required!",
  }),
  password: z.string().min(8, "Must be at least 8 characters"),
});
