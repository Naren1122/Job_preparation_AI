// Interview Redux Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { interviewService } from "../../services/interview.service";
import type {
  InterviewState,
  InterviewReport,
  InterviewReportSummary,
  GenerateReportRequest,
} from "../../types/interview";

const initialState: InterviewState = {
  reports: [],
  reportSummaries: [],
  currentReport: null,
  isLoading: false,
  error: null,
};

// Async thunk for generating interview report
export const generateReport = createAsyncThunk<
  InterviewReport,
  GenerateReportRequest
>("interview/generateReport", async (data, { rejectWithValue }) => {
  try {
    const response = await interviewService.generateReport(data);
    return response.interviewReport;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(
      err.response?.data?.message || "Failed to generate report",
    );
  }
});

// Async thunk for getting all reports
export const getAllReports = createAsyncThunk<InterviewReportSummary[], void>(
  "interview/getAllReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await interviewService.getAllReports();
      return response.interviewReports;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch reports",
      );
    }
  },
);

// Async thunk for getting a single report by ID
export const getReportById = createAsyncThunk<InterviewReport, string>(
  "interview/getReportById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await interviewService.getReportById(id);
      return response.interviewReport;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch report",
      );
    }
  },
);

// Async thunk for generating resume PDF
export const generateResumePdf = createAsyncThunk<Blob, string>(
  "interview/generateResumePdf",
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await interviewService.generateResumePdf(reportId);
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "Failed to generate PDF",
      );
    }
  },
);

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate Report
      .addCase(generateReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentReport = action.payload;
        state.reports.unshift(action.payload);
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get All Reports
      .addCase(getAllReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportSummaries = action.payload;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get Report By ID
      .addCase(getReportById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReportById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentReport = action.payload;
      })
      .addCase(getReportById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Generate Resume PDF
      .addCase(generateResumePdf.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateResumePdf.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(generateResumePdf.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentReport, clearError } = interviewSlice.actions;
export default interviewSlice.reducer;
