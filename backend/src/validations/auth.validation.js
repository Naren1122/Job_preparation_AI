import { z } from "zod";

// Email validation: must be proper format with allowed domains
const allowedDomains = ["gmail.com"];

// Password validation: min 8 chars, uppercase, lowercase, special char, number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{8,}$/;

// Register validation schema
export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (email) => {
        const emailLower = email.toLowerCase();
        const domain = emailLower.split("@")[1];
        return allowedDomains.includes(domain);
      },
      {
        message: `Email must be from one of: ${allowedDomains.join(", ")}`,
      },
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&)",
    ),
});

// Login validation schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
