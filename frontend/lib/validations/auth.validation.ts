import { z } from "zod";

// Email validation: must be proper format with allowed domains
export const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "yandex.com",
  "aol.com",
  "live.com",
  "msn.com",
];

// Password validation: min 8 chars, uppercase, lowercase, special char, number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).{8,}$/;

// Register validation schema
export const registerSchema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Login validation schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// Validation helper functions for real-time feedback
export const validateEmail = (
  email: string,
): { valid: boolean; message: string } => {
  if (!email) return { valid: false, message: "Email is required" };

  // Check for @ symbol
  if (!email.includes("@")) {
    return { valid: false, message: "Missing @ symbol" };
  }

  const parts = email.split("@");
  if (parts.length !== 2) {
    return { valid: false, message: "Invalid email format" };
  }

  const [localPart, domain] = parts;

  // Check for local part (before @)
  if (!localPart || localPart.trim() === "") {
    return { valid: false, message: "Missing username before @" };
  }

  // Check for domain (after @)
  if (!domain || domain.trim() === "") {
    return { valid: false, message: "Missing domain after @" };
  }

  // Check for dot in domain
  if (!domain.includes(".")) {
    return { valid: false, message: "Missing .com/.org etc." };
  }

  const domainLower = domain.toLowerCase();
  if (!allowedDomains.includes(domainLower)) {
    // Show what domain is being used
    return {
      valid: false,
      message: `Invalid domain: @${domain}. Use: ${allowedDomains.slice(0, 3).join(", ")}...`,
    };
  }

  return { valid: true, message: "Valid email" };
};

export interface PasswordRequirements {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}

export const validatePassword = (password: string): PasswordRequirements => {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&]/.test(password),
  };
};

export const isPasswordValid = (
  requirements: PasswordRequirements,
): boolean => {
  return Object.values(requirements).every(Boolean);
};

// Helper to get password error message
export const getPasswordErrorMessage = (
  requirements: PasswordRequirements,
): string | null => {
  if (
    requirements.minLength &&
    requirements.uppercase &&
    requirements.lowercase &&
    requirements.number &&
    requirements.specialChar
  ) {
    return null;
  }
  return "Password should contain at least 1 Uppercase, 1 special character, and 1 number";
};
