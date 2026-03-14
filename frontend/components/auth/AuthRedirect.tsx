"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

// Custom hook to check for token in localStorage
function useHasToken() {
  return typeof window !== "undefined" && !!localStorage.getItem("token");
}

interface AuthRedirectProps {
  children: React.ReactNode;
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const hasToken = useHasToken();

  useEffect(() => {
    // Redirect if authenticated (from Redux or localStorage token)
    if (!isLoading && (isAuthenticated || hasToken)) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, hasToken, router]);

  if (isLoading || isAuthenticated || hasToken) {
    return null;
  }

  return <>{children}</>;
}
