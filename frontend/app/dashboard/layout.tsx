"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMe } from "@/store/slices/authSlice";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is authenticated on mount
    if (!isAuthenticated && !isLoading) {
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">
                AI Job - Interview Prep
              </h1>
              <nav className="flex items-center gap-4">
                <a
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </a>
                <a
                  href="/interview/new"
                  className="text-gray-600 hover:text-gray-900"
                >
                  New Report
                </a>
                <a
                  href="/reports"
                  className="text-gray-600 hover:text-gray-900"
                >
                  My Reports
                </a>
                <button
                  onClick={() => {
                    // Will add logout later
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
