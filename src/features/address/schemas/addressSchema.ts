import { z } from "zod";

export const addressSchema = z.object({

  label: z
    .string()
    .min(2, "Label is required"),

  line1: z
    .string()
    .min(
      5,
      "Address line is required"
    ),

  line2: z.string().optional(),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  country: z
    .string()
    .min(
      2,
      "Country is required"
    ),

  postalCode: z
    .string()
    .min(
      4,
      "Postal code is required"
    ),

  defaultAddress:
    z.boolean(),
});

export type AddressFormData =
  z.infer<typeof addressSchema>;