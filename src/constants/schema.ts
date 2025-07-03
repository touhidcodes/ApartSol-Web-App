import { z } from "zod";

export const flatPostValidationSchema = z.object({
  title: z.string().min(1, "Flat title is required"),
  image: z.string({ required_error: "Image file is required" }),
  squareFeet: z.string().min(1, "Square feet must be a positive number"),
  totalBedrooms: z.string().min(1, "Total bedrooms must be a positive number"),
  totalRooms: z.string().min(1, "Total rooms must be a positive number"),
  amenities: z.string().min(1, "Amenities description is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  rent: z.string().min(1, "Rent must be a positive number"),
  advanceAmount: z.string().min(1, "Advance amount must be a positive number"),
});

export const changePasswordValidationSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
