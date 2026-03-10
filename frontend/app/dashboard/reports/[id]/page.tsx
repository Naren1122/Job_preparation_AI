"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getReportById,
  generateResumePdf,
} from "@/store/slices/interviewSlice";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  Target,
  BookOpen,
  Clock,
} from "lucide-react";

export default function ReportDetailPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;

  const {
    currentReport: report,
    isLoading,
    error,
  } = useAppSelector((state) => state.interview);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    if (reportId) {
      dispatch(getReportById(reportId));
    }
  }, [dispatch, reportId]);

  const handleDownloadPdf = async () => {
    try {
      setPdfLoading(true);
      const blob = await dispatch(generateResumePdf(reportId)).unwrap();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${report?.title || "interview-report"}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download PDF:", err);
    } finally {
      setPdfLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading report...</span>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/reports")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reports
        </Button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error || "Report not found"}</p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-green-600 bg-green-50";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/reports")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Reports
      </Button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
          <p className="text-gray-600">
            Created{" "}
            {new Date(report.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Button onClick={handleDownloadPdf} disabled={pdfLoading}>
          {pdfLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download PDF
        </Button>
      </div>

      {/* Match Score Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Match Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div
              className={`text-5xl font-bold ${
                report.matchScore >= 70
                  ? "text-green-600"
                  : report.matchScore >= 40
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              {report.matchScore}%
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    report.matchScore >= 70
                      ? "bg-green-600"
                      : report.matchScore >= 40
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                  style={{ width: `${report.matchScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {report.matchScore >= 70
                  ? "Great match! You are well qualified for this role."
                  : report.matchScore >= 40
                    ? "Good match. Some preparation recommended."
                    : "Consider gaining more experience before applying."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="questions">Interview Questions</TabsTrigger>
          <TabsTrigger value="skills">Skill Gaps</TabsTrigger>
          <TabsTrigger value="plan">Prep Plan</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        {/* Technical & Behavioral Questions */}
        <TabsContent value="questions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Technical Questions
              </CardTitle>
              <CardDescription>
                Prepare these technical questions for your interview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.technicalQuestions.map((q, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">
                    {index + 1}. {q.question}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Intention:</span>{" "}
                    {q.intention}
                  </p>
                  <div className="mt-2 p-3 bg-blue-50 rounded">
                    <p className="text-sm">
                      <span className="font-medium text-blue-800">
                        Suggested Answer:
                      </span>{" "}
                      <span className="text-blue-700">{q.answer}</span>
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Behavioral Questions
              </CardTitle>
              <CardDescription>
                Prepare for these behavioral interview questions using the STAR
                method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.behavioralQuestions.map((q, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">
                    {index + 1}. {q.question}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Intention:</span>{" "}
                    {q.intention}
                  </p>
                  <div className="mt-2 p-3 bg-green-50 rounded">
                    <p className="text-sm">
                      <span className="font-medium text-green-800">
                        Suggested Answer:
                      </span>{" "}
                      <span className="text-green-700">{q.answer}</span>
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skill Gaps */}
        <TabsContent value="skills" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Skill Gaps
              </CardTitle>
              <CardDescription>
                Areas where your skills may not fully match the job requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {report.skillGaps.length > 0 ? (
                <div className="space-y-3">
                  {report.skillGaps.map((gap, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg"
                    >
                      <span className="font-medium">{gap.skill}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                          gap.severity,
                        )}`}
                      >
                        {gap.severity} priority
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>No significant skill gaps identified!</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preparation Plan */}
        <TabsContent value="plan" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Preparation Plan
              </CardTitle>
              <CardDescription>
                A day-by-day plan to prepare for your interview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.preparationPlan.map((day, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">
                      Day {day.day}
                    </h4>
                    <p className="text-sm text-blue-600 font-medium">
                      {day.focus}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {day.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details */}
        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                {report.jobDescription}
              </pre>
            </CardContent>
          </Card>

          {report.selfDescription && (
            <Card>
              <CardHeader>
                <CardTitle>Self Description</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {report.selfDescription}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
