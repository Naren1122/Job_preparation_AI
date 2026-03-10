"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

// Custom hook to track if the component has mounted (client-side)
function useMounted() {
  return useSyncExternalStore(
    () => () => {}, // subscribe - no subscriptions needed
    () => true, // getClient - returns true on client (mounted)
    () => false, // getServer - returns false on server (not mounted)
  );
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [isAuthenticated, isLoading, mounted, router, pathname]);

  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
