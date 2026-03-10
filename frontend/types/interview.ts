// Interview Report Types

export interface TechnicalQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface BehavioralQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface SkillGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

export interface PreparationPlan {
  day: number;
  focus: string;
  tasks: string[];
}

export interface InterviewReport {
  _id: string;
  jobDescription: string;
  resume?: string;
  selfDescription?: string;
  matchScore: number;
  technicalQuestions: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationPlan[];
  user: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewReportSummary {
  _id: string;
  title: string;
  matchScore: number;
  createdAt: string;
}

export interface GenerateReportRequest {
  resume: File;
  selfDescription: string;
  jobDescription: string;
}

export interface InterviewState {
  reports: InterviewReport[];
  reportSummaries: InterviewReportSummary[];
  currentReport: InterviewReport | null;
  isLoading: boolean;
  error: string | null;
}
