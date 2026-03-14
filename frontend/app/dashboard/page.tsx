"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllReports, deleteReport } from "@/store/slices/interviewSlice";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  FileText,
  Plus,
  TrendingUp,
  Calendar,
  Loader2,
  Sparkles,
  Zap,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { reportSummaries, isLoading } = useAppSelector(
    (state) => state.interview,
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllReports());
  }, [dispatch]);

  const handleDelete = async (reportId: string) => {
    setDeletingId(reportId);
    try {
      await dispatch(deleteReport(reportId)).unwrap();
      setOpenDialogId(null);
    } catch (err) {
      console.error("Failed to delete report:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const thisWeekCount = reportSummaries.filter((r) => {
    const createdAt = new Date(r.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdAt > weekAgo;
  }).length;

  // Format username with proper capitalization
  const formatUsername = (username: string | undefined) => {
    if (!username) return "";
    return username
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getScoreColor = (score: number) => {
    if (score >= 70)
      return {
        bg: "from-emerald-500/20",
        text: "text-emerald-400",
        ring: "ring-emerald-500/20",
        gradient: "from-emerald-500 to-teal-400",
      };
    if (score >= 40)
      return {
        bg: "from-amber-500/20",
        text: "text-amber-400",
        ring: "ring-amber-500/20",
        gradient: "from-amber-500 to-orange-400",
      };
    return {
      bg: "from-rose-500/20",
      text: "text-rose-400",
      ring: "ring-rose-500/20",
      gradient: "from-rose-500 to-red-400",
    };
  };

  return (
    <div className="space-y-8 min-h-screen bg-slate-900/50 p-6 md:p-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative backdrop-blur-xl bg-slate-800/80 rounded-3xl border border-white/10 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/10">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-white/100">
                  AI-Powered Dashboard
                </span>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white/100 font-bold tracking-tight">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {formatUsername(user?.username)}
                  </span>
                </h1>
                <p className="text-white/100 text-lg max-w-xl mt-3 leading-relaxed">
                  Your AI-powered interview preparation hub. Analyze your
                  skills, track your progress, and ace your next interview.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/dashboard/generate" className="shrink-0">
                <Button
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Generate New Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Bento-style Stats Grid */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <EnhancedStatCard
          title="Total Reports"
          value={reportSummaries.length}
          icon={<FileText className="h-5 w-5" />}
          subtitle="All time"
          trend="+12%"
          trendUp={true}
          color="purple"
          delay={0}
        />
        <EnhancedStatCard
          title="This Week"
          value={thisWeekCount}
          icon={<Calendar className="h-5 w-5" />}
          subtitle="New analyses"
          trend={thisWeekCount > 0 ? "Active" : "No activity"}
          trendUp={thisWeekCount > 0}
          color="fuchsia"
          delay={2}
        />
        <EnhancedStatCard
          title="Best Score"
          value={
            reportSummaries.length > 0
              ? `${Math.max(...reportSummaries.map((r) => r.matchScore))}%`
              : "—"
          }
          icon={<Award className="h-5 w-5" />}
          subtitle="Personal best"
          trend={reportSummaries.length > 0 ? "Top performance" : "No data"}
          trendUp={reportSummaries.length > 0}
          color="violet"
          delay={3}
        />
      </div>

      {/* Recent Reports List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-white/10">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Recent Analysis History
              </h3>
              <p className="text-white/100 text-sm">
                Your latest interview reports
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/reports"
            className="group text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-1.5 px-4 py-2 rounded-lg hover:bg-white/10"
          >
            View all
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-white/10" />
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin" />
            </div>
            <p className="text-white/70 animate-pulse">Consulting AI data...</p>
          </div>
        ) : reportSummaries.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {reportSummaries.slice(0, 4).map((report, index) => {
              const colors = getScoreColor(report.matchScore);
              return (
                <div
                  key={report._id}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link href={`/dashboard/reports/${report._id}`}>
                    <Card className="bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm group-hover:shadow-xl group-hover:shadow-cyan-500/20">
                      {/* Card Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <CardTitle className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                              {report.title}
                            </CardTitle>
                            <CardDescription className="text-white/60 flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {new Date(report.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </CardDescription>
                          </div>
                        </div>

                        {/* Enhanced Progress Bar */}
                        <div className="relative h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
                          <div
                            className={`h-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient}`}
                            style={{ width: `${report.matchScore}%` }}
                          />
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                        </div>

                        {/* Score label */}
                        <div className="mt-2 text-xs">
                          <span className="text-white/60">Match Score:</span>
                          <span className="font-medium text-lg text-emerald-400">
                            {report.matchScore}%
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  {/* Delete Trigger */}
                  <div className="absolute top-3 right-3">
                    <AlertDialog
                      open={openDialogId === report._id}
                      onOpenChange={(o) => !o && setOpenDialogId(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenDialogId(report._id);
                          }}
                          disabled={deletingId === report._id}
                          className="p-2.5 bg-white/10 text-white/60 hover:text-rose-400 hover:bg-rose-500/20 rounded-xl backdrop-blur-md transition-all border border-white/10 hover:border-rose-500/30"
                        >
                          {deletingId === report._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-900 border border-white/10 text-white max-w-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-xl">
                            Remove Report?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-white/60">
                            This will permanently delete the analysis for
                            &ldquo;
                            {report.title}&rdquo;. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-green-500 border-white/10 text-white hover:bg-white/10 hover:border-white/20">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(report._id);
                            }}
                            className="bg-rose-600 hover:bg-rose-500 text-white"
                          >
                            Confirm Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-white/10 bg-white/5 py-16 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

            <CardContent className="relative flex flex-col items-center justify-center text-center px-4">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-blue-500/20 rounded-3xl flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-xl shadow-cyan-500/10">
                <Zap className="h-12 w-12 text-cyan-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                Launch your first analysis
              </h3>
              <p className="text-white/90 text-center max-w-md mb-8 leading-relaxed">
                Upload your resume and a job description to get instant
                AI-powered interview preparation with detailed insights.
              </p>
              <Link href="/dashboard/generate">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-6 h-auto text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-105">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your First Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Enhanced Stat Card Component
interface EnhancedStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle: string;
  trend: string;
  trendUp: boolean;
  color: string;
  delay: number;
}

function EnhancedStatCard({
  title,
  value,
  icon,
  subtitle,
  trend,
  trendUp,
  color,
  delay,
}: EnhancedStatCardProps) {
  interface ColorConfig {
    gradient: string;
    iconBg: string;
    iconColor: string;
    border: string;
    glow: string;
  }

  const colorMap: Record<string, ColorConfig> = {
    purple: {
      gradient: "from-cyan-500/20 via-blue-500/5 to-transparent",
      iconBg: "from-cyan-500 to-blue-600",
      iconColor: "text-cyan-300",
      border: "border-white/10",
      glow: "hover:shadow-cyan-500/20",
    },
    cyan: {
      gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
      iconBg: "from-cyan-500 to-blue-600",
      iconColor: "text-cyan-300",
      border: "border-white/10",
      glow: "hover:shadow-cyan-500/20",
    },
    fuchsia: {
      gradient: "from-blue-500/20 via-cyan-500/5 to-transparent",
      iconBg: "from-blue-500 to-cyan-600",
      iconColor: "text-blue-300",
      border: "border-white/10",
      glow: "hover:shadow-blue-500/20",
    },
    violet: {
      gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
      iconBg: "from-cyan-500 to-blue-600",
      iconColor: "text-cyan-300",
      border: "border-white/10",
      glow: "hover:shadow-cyan-500/20",
    },
  };

  const colors = colorMap[color];

  return (
    <Card
      className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} backdrop-blur-sm overflow-hidden relative group hover:shadow-lg ${colors.glow} transition-all duration-300 hover:-translate-y-1`}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      {/* Animated background glow */}
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
        <div className={colors.iconColor}>{icon}</div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-white/60 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full bg-${color}-400`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-bold tracking-tight mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {value}
            </div>
            <p className="text-xs text-white/60 font-medium">{subtitle}</p>
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-emerald-400" : "text-white/40"}`}
          >
            {trendUp ? <TrendingUp className="h-3.5 w-3.5" /> : null}
            {trend}
          </div>
        </div>

        {/* Decorative line */}
        <div
          className={`mt-4 h-1 w-full rounded-full bg-gradient-to-r ${colors.iconBg} opacity-50`}
        />
      </CardContent>
    </Card>
  );
}
