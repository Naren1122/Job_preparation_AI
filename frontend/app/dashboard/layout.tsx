"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMe, logout } from "@/store/slices/authSlice";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.auth,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      dispatch(getMe());
    }
  }, [dispatch, isAuthenticated, isLoading]);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("User Log Out Successfully");
    router.push("/login");
  };

  // Format username with proper capitalization
  const formatUsername = (username: string | undefined) => {
    if (!username) return "";
    return username
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/generate", label: "New Report", icon: FilePlus },
    { href: "/dashboard/reports", label: "My Reports", icon: FileText },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pointer-events-none" />
        <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />

        {/* Navigation Bar */}
        <header className="relative bg-slate-900/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0" />

          <div className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
            <div className="flex items-center justify-between h-16 sm:h-18">
              {/* Logo */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 sm:gap-3 group"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-xl shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow duration-300">
                  <Image
                    src="/ai prep.png"
                    alt="AI Prep Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">
                  AI Prep
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm lg:text-base text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-white/10"
                  >
                    <link.icon className="h-4 w-4 text-cyan-400" />
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* User Menu */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-300">
                    AI Powered
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/30 hover:text-white text-slate-300 rounded-xl border border-transparent hover:border-white/10 transition-all h-10"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">
                        {formatUsername(user?.username)}
                      </span>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-[#0f0a19] border border-white/10 text-white"
                  >
                    <div className="px-3 py-2.5 border-b border-white/10">
                      <p className="text-sm font-medium text-white">
                        Signed in as
                      </p>
                      <p className="text-xs text-white/60 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1.5"></div>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer text-rose-400 hover:text-rose-300 "
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-transparent hover:border-white/10"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 bg-[#0f0a19]/95 backdrop-blur-xl">
              <div className="px-3 sm:px-4 py-3 space-y-2">
                {/* User Info */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {user?.username}
                    </p>
                    <p className="text-xs text-white/60 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium min-h-[52px] border border-transparent hover:border-white/5"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-lg flex items-center justify-center">
                      <link.icon className="h-5 w-5 text-purple-400" />
                    </div>
                    {link.label}
                  </Link>
                ))}

                <hr className="border-white/10 my-2" />

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3.5 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors min-h-[52px] border border-transparent"
                >
                  <div className="w-9 h-9 bg-rose-500/10 rounded-lg flex items-center justify-center">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="relative z-10 mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/5 py-6 px-3 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6">
                <Image
                  src="/ai prep.png"
                  alt="AI Prep Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-white">AI Prep</span>
            </div>
            <p className="text-xs text-white/90">
              © 2026 AI Prep. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
