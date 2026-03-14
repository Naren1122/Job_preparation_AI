"use client";

import Image from "next/image";
import Link from "next/link";

import {
  User,
  LayoutDashboard,
  PlusCircle,
  Brain,
  Eye,
  Download,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI evaluates your interview readiness instantly",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Precise Matching",
      description: "Match your skills with job requirements accurately",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Improve Continuously",
      description: "Track progress and enhance your interview performance",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: <User className="w-8 h-8" />,
      title: "Authentication",
      description:
        "Create an account or log in to access the platform securely",
      path: "/login",
    },
    {
      number: "02",
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: "Dashboard",
      description:
        "Navigate to your personalized dashboard to view and manage reports",
      path: "/dashboard",
    },
    {
      number: "03",
      icon: <PlusCircle className="w-8 h-8" />,
      title: "Generate Report",
      description:
        "Upload your resume and provide self-description & job details",
      path: "/dashboard/generate",
    },
    {
      number: "04",
      icon: <Brain className="w-8 h-8" />,
      title: "AI Processing",
      description:
        "Our AI analyzes your profile against job requirements in real-time",
      path: null,
    },
    {
      number: "05",
      icon: <Eye className="w-8 h-8" />,
      title: "View Report",
      description: "Access comprehensive insights, scores, and recommendations",
      path: "/dashboard/reports",
    },
    {
      number: "06",
      icon: <Download className="w-8 h-8" />,
      title: "Download PDF",
      description: "Export your detailed interview preparation report as PDF",
      path: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/ai prep.png"
                alt="AI Prep Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Prep
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Link
              href="/login"
              className="px-4 lg:px-5 py-2 text-sm lg:text-base text-white/80 hover:text-white transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 lg:px-5 py-2 text-sm lg:text-base bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/25"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10 px-3 pb-4">
            <div className="flex flex-col gap-3 pt-3">
              <Link
                href="/login"
                className="px-4 lg:px-5 py-2 text-sm lg:text-base text-white/80 hover:text-white transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white/80">
                  AI-Powered Interview Preparation
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ace Your Next{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Interview
                </span>
              </h1>

              <p className="text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
                Get personalized interview reports powered by AI. Analyze your
                resume, compare with job descriptions, and receive actionable
                insights to land your dream job.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all shadow-lg"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <Image
                  src="/talk.jpg"
                  alt="AI Interview Preparation"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Match Score</p>
                      <p className="text-white/60 text-sm">
                        92% • Excellent Fit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-cyan-400">AI Prep</span>?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to supercharge your interview
              preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Workflow Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It <span className="text-purple-400">Works</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Follow these simple steps to generate your interview preparation
              report
            </p>
          </div>

          {/* Workflow Diagram */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform -translate-y-1/2 z-0"></div>

            <div className="grid lg:grid-cols-6 gap-6 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="group">
                  <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col">
                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-bold text-white/20 group-hover:text-cyan-400 transition-colors">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 flex-grow">
                      {step.description}
                    </p>

                    {step.path && (
                      <Link
                        href={step.path}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                      >
                        Learn more
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Flow Arrow */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-sm">Complete process in minutes</span>
              <ArrowRight className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400">
                Get results instantly
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bTggOGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

            <div className="relative px-8 py-16 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Boost Your Interview Skills?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of job seekers who have improved their interview
                performance with AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-white/90 transition-all shadow-lg"
                >
                  Create New Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/ai prep.png"
                alt="AI Prep Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-white/80">AI Prep</span>
          </div>
          <p className="text-white/50 text-sm">
            © 2026 AI Prep. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
