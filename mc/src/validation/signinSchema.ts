import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,}$/;

export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, and a special character"
    ),
});

export type SigninSchema = z.infer<typeof signinSchema>;
