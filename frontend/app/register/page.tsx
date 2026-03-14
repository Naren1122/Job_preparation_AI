"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register as registerUser, clearError } from "@/store/slices/authSlice";
import { AuthRedirect } from "@/components/auth/AuthRedirect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  validateEmail,
  validatePassword,
  isPasswordValid,
  getPasswordErrorMessage,
} from "@/lib/validations/auth.validation";
import { Check, X, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailValidation, setEmailValidation] = useState<{
    valid: boolean;
    message: string;
  }>({ valid: false, message: "" });

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (error) {
      dispatch(clearError());
    }
    setServerError("");

    if (name === "email") {
      setEmailValidation(validateEmail(value));
    }

    if (name === "password") {
      setPasswordRequirements(validatePassword(value));
    }
  };

  const isFormValid = (): boolean => {
    const emailValid = emailValidation.valid;
    const passwordValid = isPasswordValid(passwordRequirements);
    const passwordsMatch =
      formData.password === formData.confirmPassword &&
      formData.confirmPassword !== "";
    const usernameFilled = formData.username.trim() !== "";

    return usernameFilled && emailValid && passwordValid && passwordsMatch;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      setServerError("Please fill in all fields correctly");
      return;
    }

    const { ...registerData } = formData;
    const result = await dispatch(registerUser(registerData));

    if (registerUser.fulfilled.match(result)) {
      toast.success("User Registered Successfully");
      router.push("/dashboard");
    }
  };

  const passwordErrorMessage = getPasswordErrorMessage(passwordRequirements);

  return (
    <AuthRedirect>
      <div className="min-h-screen flex">
        {/* Right Side - Hero Image (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 relative order-2">
          <div className="absolute inset-0">
            <Image
              src="/signup.jpg"
              alt="Sign Up"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-900/70 via-purple-900/50 to-slate-900/70"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white w-full order-1">
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
              Start Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Interview Prep
              </span>
            </h1>

            <p className="text-lg text-white/90 mb-6">
              Create your free account and get AI-driven insights to ace your
              interview.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-500/40 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-white">
                  Upload and analyze your resume
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-500/40 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-white">
                  Compare with job descriptions
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-500/40 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-white">
                  Get actionable recommendations
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8 order-1 lg:order-1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>
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
                Create Account
              </h2>
              <p className="text-white/100 text-sm sm:text-base">
                Start your journey
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 p-5 sm:p-8 lg:p-10 shadow-xl">
              {(error || serverError) && (
                <Alert className="bg-red-500/20 border-red-400/50 mb-4 sm:mb-6">
                  <AlertDescription className="text-red-100 text-sm">
                    {error || serverError}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-white text-sm sm:text-base font-medium"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-cyan-400 h-11 sm:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl"
                  />
                </div>

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
                      placeholder="Create password"
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
                  {formData.password &&
                    !isPasswordValid(passwordRequirements) && (
                      <div className="mt-2 space-y-1">
                        <p className="text-red-300 text-xs">
                          {passwordErrorMessage}
                        </p>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div
                            className={`flex items-center gap-1 ${passwordRequirements.minLength ? "text-green-300" : "text-white/50"}`}
                          >
                            {passwordRequirements.minLength ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                            8+ chars
                          </div>
                          <div
                            className={`flex items-center gap-1 ${passwordRequirements.uppercase ? "text-green-300" : "text-white/50"}`}
                          >
                            {passwordRequirements.uppercase ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                            Uppercase
                          </div>
                          <div
                            className={`flex items-center gap-1 ${passwordRequirements.lowercase ? "text-green-300" : "text-white/50"}`}
                          >
                            {passwordRequirements.lowercase ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                            Lowercase
                          </div>
                          <div
                            className={`flex items-center gap-1 ${passwordRequirements.number ? "text-green-300" : "text-white/50"}`}
                          >
                            {passwordRequirements.number ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                            Number
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white text-sm sm:text-base font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="bg-white/15 border-white/30 text-white placeholder:text-white/50 focus:border-cyan-400 h-11 sm:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl pr-10 sm:pr-12"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <div
                      className={`flex items-center gap-1 text-xs ${formData.password === formData.confirmPassword ? "text-green-300" : "text-red-300"}`}
                    >
                      {formData.password === formData.confirmPassword ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      <span>
                        {formData.password === formData.confirmPassword
                          ? "Passwords match"
                          : "Passwords do not match"}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium sm:font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-xl"
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="text-sm">Creating...</span>
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-4 sm:mt-5 text-center">
                <p className="text-white/60 text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <p className="text-center text-white/100 text-xs sm:text-sm mt-4 sm:mt-6">
              Join job seekers preparing with AI
            </p>
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
}
