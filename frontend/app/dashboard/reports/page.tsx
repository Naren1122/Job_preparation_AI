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
      <div className="container mx-auto px-4 max-w-5xl md:max-w-6xl py-6">
        <div className="flex flex-col items-center w-full">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="self-start mb-5 text-white/90 bg-rose-500 border border-rose-500 hover:bg-rose-400 hover:border-rose-400 min-h-[44px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* Header Section */}
          <div className="flex flex-col items-center w-full gap-5 mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="hidden sm:inline">Interview Reports</span>
              <span className="sm:hidden">Reports</span>
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              View and manage all your interview preparation reports
            </p>
            <Link href="/dashboard/generate" className="mt-2">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 text-sm">
                <Sparkles className="mr-1.5 sm:mr-2 h-4 w-4" />
                Generate New Report
              </Button>
            </Link>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 mb-6">
              <p className="text-rose-400">{error}</p>
            </div>
          )}

          {isLoading && !deletingId ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-cyan-400" />
              <span className="ml-2 text-sm sm:text-base text-white/60">
                Loading reports...
              </span>
            </div>
          ) : reportSummaries.length > 0 ? (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {reportSummaries.map((report) => (
                <div key={report._id} className="relative group">
                  <Link href={`/dashboard/reports/${report._id}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
                              <FileText className="h-5 w-5 text-cyan-400" />
                              {report.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-white/60">
                              {new Date(report.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </CardDescription>
                          </div>
                          <div
                            className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                              report.matchScore >= 70
                                ? "bg-emerald-500/20 text-emerald-400"
                                : report.matchScore >= 40
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-rose-500/20 text-rose-400"
                            }`}
                          >
                            {report.matchScore}%
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/60">
                            Match Score
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              report.matchScore >= 70
                                ? "bg-emerald-500"
                                : report.matchScore >= 40
                                  ? "bg-amber-500"
                                  : "bg-rose-500"
                            }`}
                            style={{ width: `${report.matchScore}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Delete Button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <AlertDialog
                      open={openDialogId === report._id}
                      onOpenChange={(open) => {
                        if (!open) setOpenDialogId(null);
                      }}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 w-8 p-0 shadow-md"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenDialogId(report._id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-900 border border-white/10 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Report</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete `&quot;`
                            {report.title}
                            `&quot;`? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(report._id);
                            }}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={deletingId === report._id}
                          >
                            {deletingId === report._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-slate-200 bg-slate-50">
              <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Zap className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-500" />
                </div>
                <p className="text-slate-600 mb-1 sm:mb-2 font-medium text-base sm:text-lg">
                  No reports yet
                </p>
                <p className="text-slate-500 text-sm mb-4 sm:mb-6">
                  Start by generating your first interview report
                </p>
                <Link href="/dashboard/generate">
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-sm sm:text-base">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Create Your First Report
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
