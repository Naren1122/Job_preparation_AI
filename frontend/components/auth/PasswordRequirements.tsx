"use client";

import { Check, X } from "lucide-react";
import type { PasswordRequirements } from "@/lib/validations/auth.validation";

interface PasswordRequirementsProps {
  requirements: PasswordRequirements;
}

export function PasswordRequirements({
  requirements,
}: PasswordRequirementsProps) {
  const items = [
    { key: "minLength", label: "At least 8 characters" },
    { key: "uppercase", label: "One uppercase letter (A-Z)" },
    { key: "lowercase", label: "One lowercase letter (a-z)" },
    { key: "number", label: "One number (0-9)" },
    { key: "specialChar", label: "One special character (!@#$%^&)" },
  ];

  return (
    <div className="mt-2 space-y-1 rounded-md border border-gray-200 bg-gray-50 p-3">
      <p className="mb-2 text-sm font-medium text-gray-700">
        Password requirements:
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isMet = requirements[item.key as keyof PasswordRequirements];
          return (
            <li
              key={item.key}
              className={`flex items-center gap-2 text-xs ${
                isMet ? "text-green-600" : "text-gray-500"
              }`}
            >
              {isMet ? (
                <Check className="h-3 w-3 text-green-600" />
              ) : (
                <X className="h-3 w-3 text-red-400" />
              )}
              <span className={isMet ? "font-medium" : ""}>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
