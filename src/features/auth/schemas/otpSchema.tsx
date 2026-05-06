import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "Only digits allowed"),
});

export type OtpFormData = z.infer<typeof otpSchema>;