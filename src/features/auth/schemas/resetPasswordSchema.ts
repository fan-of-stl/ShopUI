import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.{8,50}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        "Password must be between 8 and 50 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords entered do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData =
  z.infer<typeof resetPasswordSchema>;