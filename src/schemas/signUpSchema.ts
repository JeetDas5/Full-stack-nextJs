import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters long")
  .max(20, "Username must be at most 20 characters long")
  .regex(
    /^[a-zA-Z0-9_]*$/,
    "Username must only contain letters, numbers, and underscores"
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});
