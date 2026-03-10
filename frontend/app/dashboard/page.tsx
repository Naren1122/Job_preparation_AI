"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllReports } from "@/store/slices/interviewSlice";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { reportSummaries, isLoading } = useAppSelector(
    (state) => state.interview,
  );

  useEffect(() => {
    dispatch(getAllReports());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.username}!
          </h2>
          <p className="text-gray-600">
            Prepare for your next interview with AI-powered insights
          </p>
        </div>
        <Link href="/dashboard/generate">
          <Button>New Interview Report</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportSummaries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Match Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reportSummaries.length > 0
                ? Math.round(
                    reportSummaries.reduce((acc, r) => acc + r.matchScore, 0) /
                      reportSummaries.length,
                  )
                : 0}
              %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                reportSummaries.filter((r) => {
                  const createdAt = new Date(r.createdAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return createdAt > weekAgo;
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Reports</h3>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading reports...</p>
          </div>
        ) : reportSummaries.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {reportSummaries.slice(0, 4).map((report) => (
              <Link key={report._id} href={`/dashboard/reports/${report._id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Match Score</span>
                      <span
                        className={`text-lg font-bold ${
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
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
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
    </div>
  );
}
