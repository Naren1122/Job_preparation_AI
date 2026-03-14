"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllReports, deleteReport } from "@/store/slices/interviewSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Trash2,
  Sparkles,
  FilePlus,
  Zap,
  Clock,
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

export default function ReportsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { reportSummaries, isLoading, error } = useAppSelector(
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 1. Main Container: Added max-width and centering */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 2. Top Navigation: Positioned to the left */}
        <div className="flex justify-start mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="text-white/90 bg-rose-500 border border-rose-500 hover:bg-rose-400 hover:border-rose-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* 3. Header Section: Balanced spacing and alignment */}
        <div className="flex flex-col items-center text-center w-full gap-4 mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-2">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interview Reports
          </h1>
          <p className="text-white/60 text-base max-w-2xl">
            View and manage all your interview preparation reports. Analyze your
            performance and improve your readiness.
          </p>
          <Link href="/dashboard/generate">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 mt-2">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </Link>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 mb-8 text-center">
            <p className="text-rose-400">{error}</p>
          </div>
        )}

        {/* 4. Content Area: Grid Layout */}
        <div className="w-full">
          {isLoading && !deletingId ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-cyan-400 mb-4" />
              <span className="text-white/60 font-medium">
                Loading your reports...
              </span>
            </div>
          ) : reportSummaries.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reportSummaries.map((report) => {
                const gradient =
                  report.matchScore >= 70
                    ? "from-emerald-500 to-teal-400"
                    : report.matchScore >= 40
                      ? "from-amber-500 to-orange-400"
                      : "from-rose-500 to-red-400";

                return (
                  <div key={report._id} className="relative group">
                    <Link href={`/dashboard/reports/${report._id}`}>
                      <Card className="h-full bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm group-hover:shadow-xl group-hover:shadow-cyan-500/20">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-6 pr-8">
                            <div className="space-y-1">
                              <CardTitle className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                                {report.title}
                              </CardTitle>
                              <CardDescription className="text-white/50 flex items-center gap-1.5 text-xs">
                                <Clock className="h-3 w-3" />
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

                          <div className="space-y-3">
                            <div className="flex justify-between items-end">
                              <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                                Match Score
                              </span>
                              <span className="text-xl font-bold text-white">
                                {report.matchScore}%
                              </span>
                            </div>
                            <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-1000 bg-gradient-to-r ${gradient}`}
                                style={{ width: `${report.matchScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>

                    {/* Delete Trigger - Positioned absolutely within the relative wrapper */}
                    <div className="absolute top-4 right-4 z-10">
                      <AlertDialog
                        open={openDialogId === report._id}
                        onOpenChange={(open) => !open && setOpenDialogId(null)}
                      >
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenDialogId(report._id);
                            }}
                            disabled={deletingId === report._id}
                            className="p-2 bg-white/5 text-white/40 hover:text-rose-400 hover:bg-rose-500/20 rounded-lg transition-all border border-white/5 hover:border-rose-500/30"
                          >
                            {deletingId === report._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-900 border border-white/10 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Report?</AlertDialogTitle>
                            <AlertDialogDescription className="text-white/60">
                              This will permanently delete the analysis for
                              &ldquo;{report.title}&rdquo;.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(report._id);
                              }}
                              className="bg-rose-600 hover:bg-rose-500"
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
            /* 5. Empty State: Updated to match dark theme */
            <div className="max-w-md mx-auto">
              <Card className="border-dashed border-2 border-white/10 bg-white/5 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6">
                    <Zap className="h-10 w-10 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No reports yet
                  </h3>
                  <p className="text-white/50 text-sm mb-8">
                    Ready to ace your next interview? Generate your first
                    AI-powered analysis.
                  </p>
                  <Link href="/dashboard/generate">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-600">
                      <FilePlus className="mr-2 h-4 w-4" />
                      Create Your First Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
