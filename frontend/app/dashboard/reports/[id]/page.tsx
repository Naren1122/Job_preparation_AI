"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getReportById } from "@/store/slices/interviewSlice";
import { interviewService } from "@/services/interview.service";
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
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Calendar,
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
      const blob = await interviewService.generateResumePdf(reportId);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Sophisticated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-blue-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center py-20 sm:py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-blue-600" />
              <div className="absolute inset-0 h-10 w-10 sm:h-12 sm:w-12 animate-ping bg-blue-400/20 rounded-full"></div>
            </div>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Loading your report...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Sophisticated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-blue-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        </div>
        <div className="relative z-10 container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/reports")}
            className="mb-4 sm:mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-h-[44px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to Reports</span>
          </Button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm sm:text-base">
              {error || "Report not found"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "from-green-500 to-emerald-600";
    if (score >= 40) return "from-yellow-500 to-amber-600";
    return "from-red-500 to-rose-600";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-blue-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-200/30 to-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-r from-blue-100/20 to-cyan-100/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 max-w-5xl md:max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/reports")}
          className="mb-4 sm:mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-h-[44px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="sm:hidden">Back</span>
          <span className="hidden sm:inline">Back to Reports</span>
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="order-2 sm:order-1">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="line-clamp-1">{report.title}</span>
            </h1>
            <p className="text-slate-600 mt-1 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Created{" "}
              {new Date(report.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <Button
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
            className="order-1 sm:order-2 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25 text-sm"
          >
            {pdfLoading ? (
              <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-1.5 sm:mr-2 h-4 w-4" />
            )}
            <span className="sm:hidden">PDF</span>
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>

        {/* Match Score Card */}
        <Card className="mb-4 sm:mb-6 md:mb-8 border-slate-200/50 shadow-xl shadow-slate-200/30 bg-white/70 backdrop-blur-sm rounded-xl">
          <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <CardHeader className="bg-white/50 border-b border-slate-100/50 pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-900 text-base sm:text-lg">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Match Score
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className={`relative self-center sm:self-auto`}>
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${getScoreColor(report.matchScore)} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {report.matchScore}%
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="w-full bg-slate-200 rounded-full h-3 sm:h-4 mb-3 sm:mb-4">
                  <div
                    className={`h-3 sm:h-4 rounded-full bg-gradient-to-r ${getScoreColor(report.matchScore)} transition-all duration-500`}
                    style={{ width: `${report.matchScore}%` }}
                  ></div>
                </div>
                <div
                  className={`text-sm sm:text-base md:text-lg font-medium ${getScoreTextColor(report.matchScore)} flex items-center gap-1.5 sm:gap-2`}
                >
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  {report.matchScore >= 70
                    ? "Great match! You are well qualified for this role."
                    : report.matchScore >= 40
                      ? "Good match. Some preparation recommended."
                      : "Consider gaining more experience before applying."}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1">
            <TabsTrigger
              value="questions"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Skill Gaps
            </TabsTrigger>
            <TabsTrigger
              value="plan"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Clock className="h-4 w-4 mr-2" />
              Prep Plan
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <FileText className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
          </TabsList>

          {/* Technical & Behavioral Questions */}
          <TabsContent value="questions" className="space-y-6 mt-6">
            <Card className="border-slate-200/50 shadow-lg shadow-slate-200/20 bg-white/70 backdrop-blur-sm rounded-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border-b border-slate-100/50">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Technical Questions
                </CardTitle>
                <CardDescription>
                  Prepare these technical questions for your interview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {report.technicalQuestions.map((q, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-slate-900 flex items-start gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      {q.question}
                    </h4>
                    <p className="text-sm text-slate-600 mt-2 ml-8">
                      <span className="font-medium">Intention:</span>{" "}
                      {q.intention}
                    </p>
                    <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 ml-8">
                      <p className="text-sm flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium text-blue-800">
                          Suggested Answer:
                        </span>
                        <span className="text-blue-700">{q.answer}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200/50 shadow-lg shadow-slate-200/20 bg-white/70 backdrop-blur-sm rounded-xl">
              <CardHeader className="bg-gradient-to-r from-green-50/70 to-emerald-50/70 border-b border-slate-100/50">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Behavioral Questions
                </CardTitle>
                <CardDescription>
                  Prepare for these behavioral interview questions using the
                  STAR method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {report.behavioralQuestions.map((q, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-slate-900 flex items-start gap-2">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      {q.question}
                    </h4>
                    <p className="text-sm text-slate-600 mt-2 ml-8">
                      <span className="font-medium">Intention:</span>{" "}
                      {q.intention}
                    </p>
                    <div className="mt-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 ml-8">
                      <p className="text-sm flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium text-green-800">
                          Suggested Answer:
                        </span>
                        <span className="text-green-700">{q.answer}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skill Gaps */}
          <TabsContent value="skills" className="space-y-4 mt-6">
            <Card className="border-slate-200/50 shadow-lg shadow-slate-200/20 bg-white/70 backdrop-blur-sm rounded-xl">
              <CardHeader className="bg-gradient-to-r from-amber-50/70 to-orange-50/70 border-b border-slate-100/50">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Skill Gaps
                </CardTitle>
                <CardDescription>
                  Areas where your skills may not fully match the job
                  requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {report.skillGaps.length > 0 ? (
                  <div className="space-y-3">
                    {report.skillGaps.map((gap, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow"
                      >
                        <span className="font-medium text-slate-900">
                          {gap.skill}
                        </span>
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getSeverityColor(
                            gap.severity,
                          )}`}
                        >
                          {gap.severity} priority
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-6 bg-green-50 rounded-xl border border-green-200">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">
                        No significant skill gaps identified!
                      </p>
                      <p className="text-sm text-green-600">
                        Your skills are well-aligned with the job requirements.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preparation Plan */}
          <TabsContent value="plan" className="space-y-4 mt-6">
            <Card className="border-slate-200/50 shadow-lg shadow-slate-200/20 bg-white/70 backdrop-blur-sm rounded-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50/70 to-pink-50/70 border-b border-slate-100/50">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Preparation Plan
                </CardTitle>
                <CardDescription>
                  A day-by-day plan to prepare for your interview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-2">
                  {report.preparationPlan.map((day, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            Day {day.day}
                          </h4>
                          <p className="text-sm text-purple-600 font-medium">
                            {day.focus}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 ml-13">
                        {day.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="flex items-start gap-2 text-sm text-slate-600"
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
          <TabsContent value="details" className="space-y-4 mt-6">
            <Card className="border-slate-200/50 shadow-lg shadow-slate-200/20 bg-white/70 backdrop-blur-sm rounded-xl">
              <CardHeader className="bg-white/50 border-b border-slate-100/50">
                <CardTitle className="text-slate-900">
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                  {report.jobDescription}
                </pre>
              </CardContent>
            </Card>

            {report.selfDescription && (
              <Card className="border-slate-200/50 shadow-lg shadow-slate-200/20 bg-white/70 backdrop-blur-sm rounded-xl">
                <CardHeader className="bg-white/50 border-b border-slate-100/50">
                  <CardTitle className="text-slate-900">
                    Self Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
                    {report.selfDescription}
                  </pre>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
