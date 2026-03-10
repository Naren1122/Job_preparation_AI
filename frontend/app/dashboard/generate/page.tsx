"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { interviewService } from "@/services/interview.service";
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
  Upload,
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
  const { currentReport, isLoading, error } = useSelector(
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

      // Navigate to the report detail page after successful generation
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
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Generate Interview Report
          </CardTitle>
          <CardDescription>
            Upload your resume and provide details to generate a personalized
            interview preparation report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF) *</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="resume"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  {resumeFile ? (
                    <span className="text-sm font-medium text-green-600">
                      {resumeFile.name}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      Click to upload PDF resume
                    </span>
                  )}
                </Label>
              </div>
              {fileError && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {fileError}
                </p>
              )}
            </div>

            {/* Self Description */}
            <div className="space-y-2">
              <Label htmlFor="selfDescription">Self Description *</Label>
              <Textarea
                id="selfDescription"
                placeholder="Describe yourself, your experience, skills, and career goals..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                rows={5}
                required
              />
              <p className="text-xs text-gray-500">
                Provide a brief description of yourself, your professional
                background, key skills, and what you&apos;re looking for in your
                next role.
              </p>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description *</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description you're applying for..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={8}
                required
              />
              <p className="text-xs text-gray-500">
                Paste the complete job description including responsibilities,
                requirements, and qualifications.
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-700">Error</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !resumeFile ||
                  !selfDescription.trim() ||
                  !jobDescription.trim()
                }
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                disabled={isLoading}
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="mt-6 bg-blue-50 border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-800">
            Tips for Best Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700 space-y-2">
          <ul className="list-disc list-inside space-y-1">
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
  );
}
