import { z } from "zod";

export const createPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  squareFeet: z.string().min(1, "Square feet is required"),
  totalRooms: z.string().min(1, "Total rooms is required"),
  totalBedrooms: z.string().min(1, "Total bedrooms is required"),
  totalBathrooms: z.string().min(1, "Total bathrooms is required"),
  propertyType: z.string().min(1, "Property type is required"),
  purpose: z.string().min(1, "Purpose is required"),
  street: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  description: z.string().min(1, "Description is required"),
  amenities: z.array(z.string()),
  rent: z.string().min(1, "Rent is required"),
  advanceAmount: z.string().min(1, "Advance amount is required"),
});
