import { z } from "zod";

export const forgotPasswordSchema = z.object({
  username: z
    .string()
    .min(3, "Username or email required"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;