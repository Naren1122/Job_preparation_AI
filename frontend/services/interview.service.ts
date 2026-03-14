// Interview Service - API calls for interview reports
import api from "../lib/api";
import type {
  InterviewReport,
  InterviewReportSummary,
  GenerateReportRequest,
} from "../types/interview";

export const interviewService = {
  // Generate a new interview report
  async generateReport(
    data: GenerateReportRequest,
  ): Promise<{ message: string; interviewReport: InterviewReport }> {
    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("selfDescription", data.selfDescription);
    formData.append("jobDescription", data.jobDescription);

    const response = await api.post<{
      message: string;
      interviewReport: InterviewReport;
    }>("/api/interview/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get all interview reports for the current user
  async getAllReports(): Promise<{
    message: string;
    interviewReports: InterviewReportSummary[];
  }> {
    const response = await api.get<{
      message: string;
      interviewReports: InterviewReportSummary[];
    }>("/api/interview/");
    return response.data;
  },

  // Get a specific interview report by ID
  async getReportById(
    id: string,
  ): Promise<{ message: string; interviewReport: InterviewReport }> {
    const response = await api.get<{
      message: string;
      interviewReport: InterviewReport;
    }>(`/api/interview/report/${id}`);
    return response.data;
  },

  // Generate and download a resume PDF
  async generateResumePdf(reportId: string): Promise<Blob> {
    const response = await api.post(
      `/api/interview/resume/pdf/${reportId}`,
      {},
      {
        responseType: "blob",
      },
    );
    return response.data;
  },

  // Delete an interview report by ID
  async deleteReport(reportId: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(
      `/api/interview/${reportId}`,
    );
    return response.data;
  },
};
