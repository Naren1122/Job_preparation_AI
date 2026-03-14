"use client";

import { useEffect } from "react";

export function AuthInitializer() {
  useEffect(() => {
    // Check if token exists in localStorage and sync to cookie for middleware
    const token = localStorage.getItem("token");
    if (token) {
      // Set cookie if not already set
      const cookieExists = document.cookie
        .split(";")
        .some((c) => c.trim().startsWith("token="));

      if (!cookieExists) {
        document.cookie = `token=${token}; path=/; max-age=${24 * 60 * 60}; SameSite=Lax`;
      }
    }
  }, []);

  // This component doesn't render anything
  // It's just used to initialize the auth state
  return null;
}
