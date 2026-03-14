"use client";

import { useEffect } from "react";

export function AuthInitializer() {
  useEffect(() => {
    // Clean up any stale localStorage token from previous sessions
    // The only valid token now is the HTTP-only cookie set by the backend
    const token = localStorage.getItem("token");
    if (token) {
      // Clear stale localStorage token - it should only come from backend cookie
      localStorage.removeItem("token");
    }
  }, []);

  // This component doesn't render anything
  // It's just used to initialize the auth state
  return null;
}
