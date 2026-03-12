"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  FileText,
  Loader2,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  FileUp,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  generateReport,
  clearCurrentReport,
} from "@/store/slices/interviewSlice";

export default function GenerateReportPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector(
    (state: RootState) => state.interview,
  );

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setFileError("Please upload a PDF file");
        setResumeFile(null);
        return;
      }
      setFileError(null);
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      setFileError("Please upload a resume PDF");
      return;
    }

    if (!selfDescription.trim() || !jobDescription.trim()) {
      return;
    }

    try {
      await dispatch(
        generateReport({
          resume: resumeFile,
          selfDescription: selfDescription.trim(),
          jobDescription: jobDescription.trim(),
        }),
      ).unwrap();

      router.push("/dashboard/reports");
    } catch (err) {
      console.error("Failed to generate report:", err);
    }
  };

  const handleClear = () => {
    dispatch(clearCurrentReport());
    setResumeFile(null);
    setSelfDescription("");
    setJobDescription("");
    setFileError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-0 max-w-3xl md:max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-4 sm:mb-6 text-white/90 bg-rose-500 border border-rose-500 hover:bg-rose-400 hover:border-rose-400 min-h-[44px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg shadow-cyan-500/30 mb-3 sm:mb-4">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Generate Interview Report
          </h1>
          <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base">
            Upload your resume and provide job details to get AI-powered
            interview preparation insights
          </p>
        </div>

        <Card className="bg-slate-800/80 border-white/10 backdrop-blur-sm">
          <CardHeader className="bg-slate-900/50 border-b border-white/10">
            <CardTitle className="flex items-center gap-2 text-white p-1">
              <FileText className="h-5 w-5 text-cyan-400" />
              Interview Details
            </CardTitle>
            <CardDescription className="text-white/60">
              Fill in the details below to generate your personalized report
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resume Upload */}
              <div className="space-y-3">
                <Label htmlFor="resume" className="text-white font-medium">
                  Resume (PDF) <span className="text-rose-400">*</span>
                </Label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    resumeFile
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-white/50 hover:border-white hover:bg-white/5"
                  }`}
                >
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden "
                  />
                  <Label
                    htmlFor="resume"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    {resumeFile ? (
                      <>
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-400">
                            {resumeFile.name}
                          </p>
                          <p className="text-sm text-emerald-400/70">
                            Click to change file
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                          <FileUp className="h-7 w-7 text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            Drop your resume here
                          </p>
                          <p className="text-sm text-white/50">
                            or click to browse (PDF only)
                          </p>
                        </div>
                      </>
                    )}
                  </Label>
                </div>
                {fileError && (
                  <p className="text-sm text-rose-400 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {fileError}
                  </p>
                )}
              </div>

              {/* Self Description */}
              <div className="space-y-3">
                <Label
                  htmlFor="selfDescription"
                  className="text-white font-medium"
                >
                  About You <span className="text-rose-400">*</span>
                </Label>
                <Textarea
                  id="selfDescription"
                  placeholder="Tell us about yourself, your experience, skills, and career goals..."
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  rows={5}
                  required
                  className="bg-slate-900/50 border border-white/50 focus:border-white focus:ring-white/20 resize-none text-white placeholder:text-white/40"
                />
                <p className="text-xs text-white/50 flex items-start gap-1">
                  <Lightbulb className="h-3 w-3 mt-0.5 text-cyan-400" />
                  Include your professional background, key skills, and what
                  you&apos;re looking for in your next role.
                </p>
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <Label
                  htmlFor="jobDescription"
                  className="text-white font-medium"
                >
                  Job Description <span className="text-rose-400">*</span>
                </Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description you're applying for..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  required
                  className="bg-slate-900/50 border border-white/50 focus:border-white focus:ring-white/20 resize-none text-white placeholder:text-white/40"
                />
                <p className="text-xs text-white/50 flex items-start gap-1">
                  <Lightbulb className="h-3 w-3 mt-0.5 text-cyan-400" />
                  Include the full job description with responsibilities,
                  requirements, and qualifications.
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-rose-400">Error</p>
                    <p className="text-sm text-rose-400/70">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !resumeFile ||
                    !selfDescription.trim() ||
                    !jobDescription.trim()
                  }
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 sm:h-12 px-4 sm:px-6 text-base sm:text-lg "
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  disabled={isLoading}
                  className="h-14 sm:h-12 px-6 sm:px-6 bg-transparent border-white/50 text-white hover:bg-white/10 hover:border-white/20"
                >
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-4 sm:mt-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-white">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
              Tips for Best Results
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-white/60 space-y-1.5 sm:space-y-2">
            <ul className="list-disc list-inside space-y-2">
              <li>Use a clean, well-formatted PDF resume</li>
              <li>Include the full job description for accurate matching</li>
              <li>
                Be specific about your skills and experience in the self
                description
              </li>
              <li>
                The more details you provide, the better the interview questions
                will be
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
