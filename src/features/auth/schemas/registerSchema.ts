import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .regex(
        /^(?=.{1,20}$)[A-Za-z]*$/,
        "First name may contain only alphabetic characters and must be between 1 and 20 characters long."
      ),

    lastName: z
      .string()
      .regex(
        /^(?=.{1,20}$)[A-Za-z]*$/,
        "Last name may contain only alphabetic characters and must be between 1 and 20 characters long."
      ),

    email: z
      .string()
      .email("Please provide a valid email address."),

    username: z
      .string()
      .regex(
        /^(?=.{3,30}$)(?!_)(?!.*_$)(?!.*__)\w+$/,
        "Username must be 3 to 30 characters long and cannot begin, end, or contain consecutive underscores."
      ),

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

// ✅ FORM INPUT TYPE
export type RegisterFormInput = z.input<typeof registerSchema>;