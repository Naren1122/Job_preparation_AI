"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login as loginUser, clearError } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validateEmail } from "@/lib/validations/auth.validation";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [emailValidation, setEmailValidation] = useState<{
    valid: boolean;
    message: string;
  }>({ valid: false, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (error) {
      dispatch(clearError());
    }

    if (name === "email") {
      setEmailValidation(validateEmail(value));
    }
  };

  const isFormValid = (): boolean => {
    return formData.email.trim() !== "" && formData.password !== "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0">
          <Image
            src="/login.jpg"
            alt="Login"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-purple-900/50 to-slate-900/70"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white w-full">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="relative w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl overflow-hidden border border-white/40 shadow-lg">
              <Image
                src="/ai prep.png"
                alt="AI Prep Logo"
                fill
                className="object-contain p-2"
              />
            </div>
            <span className="text-3xl font-bold">AI Prep</span>
          </Link>

          <h1 className="text-5xl font-bold mb-4">
            Welcome Back to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Prep
            </span>
          </h1>

          <p className="text-lg text-white/90 mb-6">
            Sign in to access your personalized interview preparation reports.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-cyan-500/40 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span className="text-white">
                Access all your generated reports
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-cyan-500/40 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span className="text-white">
                Track your interview preparation
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-cyan-500/40 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span className="text-white">Get AI-driven recommendations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex flex-col items-center mb-6">
            <Link
              href="/"
              className="relative w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg mb-4"
            >
              <Image
                src="/ai prep.png"
                alt="AI Prep Logo"
                fill
                className="object-contain p-2"
              />
            </Link>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              Welcome Back
            </h2>
            <p className="text-white/100 text-sm sm:text-base">
              Sign in to continue
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 p-5 sm:p-8 lg:p-10 shadow-xl">
            {error && (
              <Alert className="bg-red-500/20 border-red-400/50 mb-4 sm:mb-6">
                <AlertDescription className="text-red-100 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-white text-sm sm:text-base font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-cyan-400 h-11 sm:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl"
                />
                {formData.email && !emailValidation.valid && (
                  <p className="text-red-300 text-xs sm:text-sm">
                    {emailValidation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-white text-sm sm:text-base font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-cyan-400 h-11 sm:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl pr-10 sm:pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 sm:h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium sm:font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-xl"
                disabled={isLoading || !isFormValid()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="text-sm">Signing in...</span>
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 sm:mt-5 text-center">
              <p className="text-white/60 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-white/100 text-xs sm:text-sm mt-4 sm:mt-6">
            AI-powered interview preparation
          </p>
        </div>
      </div>
    </div>
  );
}
