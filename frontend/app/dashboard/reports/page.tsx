"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllReports } from "@/store/slices/interviewSlice";
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
import { ArrowLeft, FileText, Plus, Loader2 } from "lucide-react";

export default function ReportsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { reportSummaries, isLoading, error } = useAppSelector(
    (state) => state.interview,
  );

  useEffect(() => {
    dispatch(getAllReports());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Interview Reports
          </h1>
          <p className="text-gray-600">
            View and manage all your interview preparation reports
          </p>
        </div>
        <Link href="/dashboard/generate">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate New Report
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading reports...</span>
        </div>
      ) : reportSummaries.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reportSummaries.map((report) => (
            <Link key={report._id} href={`/dashboard/reports/${report._id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    {report.title}
                  </CardTitle>
                  <CardDescription>
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Match Score</span>
                    <span
                      className={`text-2xl font-bold ${
                        report.matchScore >= 70
                          ? "text-green-600"
                          : report.matchScore >= 40
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {report.matchScore}%
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          report.matchScore >= 70
                            ? "bg-green-600"
                            : report.matchScore >= 40
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }`}
                        style={{ width: `${report.matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              You haven&apos;t generated any interview reports yet.
            </p>
            <Link href="/dashboard/generate">
              <Button>Create Your First Report</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
