# Frontend Development Roadmap

## AI Job - Interview Preparation App

**Tech Stack:** Next.js 16 | TypeScript | Tailwind CSS | Redux Toolkit | Shadcn UI

---

## Project Overview

This roadmap breaks down the frontend development into **5 major phases** with specific tasks in each phase. The goal is to build a complete interview preparation application that integrates with the existing backend API.

---

## Phase 1: Project Setup & Foundation (Week 1)

### 1.1 Install Redux Toolkit & Additional Dependencies

```bash
npm install @reduxjs/toolkit react-redux
npm install axios
npm install react-hook-form @hookform/resolvers zod
npm install react-router-dom (if needed for routing)
```

### 1.2 Configure Redux Store

- [ ] Create `src/store/index.ts` - Redux store configuration
- [ ] Create `src/store/slices/authSlice.ts` - Authentication state management
- [ ] Create `src/store/slices/interviewSlice.ts` - Interview reports state
- [ ] Create `src/store/hooks.ts` - Typed Redux hooks
- [ ] Wrap app with Redux Provider in `app/layout.tsx`

### 1.3 Configure API Client

- [ ] Create `src/lib/api.ts` - Axios instance with baseURL
- [ ] Add interceptors for:
  - Automatic token attachment to requests
  - Token refresh on 401 responses
  - Error handling

### 1.4 Create Type Definitions

- [ ] Create `src/types/auth.ts` - Auth types (User, LoginRequest, RegisterRequest)
- [ ] Create `src/types/interview.ts` - Interview types (InterviewReport, Question, SkillGap, PreparationPlan)

---

## Phase 2: Authentication Module (Week 2)

### 2.1 Create Authentication Pages

- [ ] Create `app/(auth)/login/page.tsx` - Login page
- [ ] Create `app/(auth)/register/page.tsx` - Registration page

### 2.2 Create Auth Components

- [ ] Create `src/components/auth/LoginForm.tsx`
- [ ] Create `src/components/auth/RegisterForm.tsx`
- [ ] Use Shadcn UI components:
  - Input
  - Button
  - Label
  - Card
  - Form (react-hook-form + zod)

### 2.3 Implement Auth Redux Logic

- [ ] Add login thunk to authSlice
- [ ] Add register thunk to authSlice
- [ ] Add logout thunk to authSlice
- [ ] Add getMe thunk to authSlice

### 2.4 Create Auth API Service

- [ ] Create `src/services/auth.service.ts` - API calls for auth endpoints

### 2.5 Add Protected Route Logic

- [ ] Create `src/components/auth/ProtectedRoute.tsx` - HOC for protected pages
- [ ] Implement session persistence with cookies

---

## Phase 3: Dashboard & Navigation (Week 2-3)

### 3.1 Create Layout Components

- [ ] Create `src/components/layout/Header.tsx` - Top navigation bar
- [ ] Create `src/components/layout/Sidebar.tsx` - Side navigation (optional)
- [ ] Create `src/components/layout/Footer.tsx` - Footer component

### 3.2 Create Dashboard Page

- [ ] Create `app/(dashboard)/dashboard/page.tsx` - Main dashboard
- [ ] Create `src/components/dashboard/StatsCard.tsx` - Summary statistics
- [ ] Create `src/components/dashboard/RecentReports.tsx` - Recent interview reports list
- [ ] Create `src/components/dashboard/QuickActions.tsx` - Quick action buttons

### 3.3 Create Navigation

- [ ] Create `app/(dashboard)/layout.tsx` - Dashboard layout wrapper
- [ ] Add navigation links:
  - Dashboard (home)
  - New Interview Report
  - My Reports
  - Profile/Settings

---

## Phase 4: Interview Report Generation (Week 3-4)

### 4.1 Create Report Generation Page

- [ ] Create `app/(dashboard)/interview/new/page.tsx` - New report form

### 4.2 Create Form Components

- [ ] Create `src/components/interview/ResumeUploader.tsx` - PDF upload component
  - Use Shadcn UI: Input (file), Progress, Alert
  - Add drag-and-drop functionality
  - Show upload progress
  - Display file preview
- [ ] Create `src/components/interview/SelfDescriptionForm.tsx` - Textarea for self-description
  - Character counter
  - Placeholder examples
- [ ] Create `src/components/interview/JobDescriptionForm.tsx` - Job description input
  - Textarea with character counter
  - Paste from clipboard support

### 4.3 Create Report Generation Logic

- [ ] Implement interview API service in `src/services/interview.service.ts`
- [ ] Add generateReport thunk to interviewSlice
- [ ] Handle loading states with Redux
- [ ] Implement form validation with zod

### 4.4 Create Report Result Display

- [ ] Create `src/components/interview/MatchScoreCard.tsx` - Display match score with progress ring
- [ ] Create `src/components/interview/TechnicalQuestions.tsx` - List of technical questions
- [ ] Create `src/components/interview/BehavioralQuestions.tsx` - List of behavioral questions
- [ ] Create `src/components/interview/SkillGaps.tsx` - Skill gap visualization with severity badges
- [ ] Create `src/components/interview/PreparationPlan.tsx` - Day-by-day preparation timeline
- [ ] Create `src/components/interview/ReportDetail.tsx` - Full report view

---

## Phase 5: Reports List & Management (Week 4-5)

### 5.1 Create Reports List Page

- [ ] Create `app/(dashboard)/reports/page.tsx` - All reports list
- [ ] Create `src/components/reports/ReportCard.tsx` - Individual report card
- [ ] Create `src/components/reports/ReportsFilter.tsx` - Filter by date, job title

### 5.2 Create Report Detail Page

- [ ] Create `app/(dashboard)/reports/[id]/page.tsx` - Single report view
- [ ] Implement dynamic routing for report IDs

### 5.3 Implement Resume PDF Generation

- [ ] Create `src/components/reports/ResumePdfButton.tsx` - Generate PDF button
- [ ] Implement PDF download functionality
- [ ] Add loading state during PDF generation

### 5.4 Add Report Management

- [ ] Delete report functionality
- [ ] Share report functionality (optional)

---

## Phase 6: UI/UX Polish & Features (Week 5-6)

### 6.1 Theme & Styling

- [ ] Implement dark/light mode toggle
- [ ] Use Shadcn UI theme configuration
- [ ] Add custom Tailwind colors for brand

### 6.2 Components Polish

- [ ] Add Skeleton loaders for all async content
- [ ] Implement proper error states
- [ ] Add empty states for lists
- [ ] Create toast notifications (Sonner already installed)

### 6.3 Responsive Design

- [ ] Ensure mobile-friendly layouts
- [ ] Test on different screen sizes

### 6.4 Animations

- [ ] Add page transitions
- [ ] Animate match score progress ring
- [ ] Animate skill gap severity indicators

---

## Phase 7: Testing & Deployment (Week 6-7)

### 7.1 Testing

- [ ] Test all user flows manually
- [ ] Test edge cases (large files, network errors)
- [ ] Verify Redux state management

### 7.2 Build & Deploy

- [ ] Run production build: `npm run build`
- [ ] Fix any TypeScript errors
- [ ] Deploy to Vercel (recommended for Next.js)

---

## API Endpoints Summary

| Method | Endpoint                      | Description         | Auth |
| ------ | ----------------------------- | ------------------- | ---- |
| POST   | /api/auth/register            | Register new user   | No   |
| POST   | /api/auth/login               | Login user          | No   |
| GET    | /api/auth/logout              | Logout user         | Yes  |
| GET    | /api/auth/me                  | Get current user    | Yes  |
| POST   | /api/interview/               | Generate new report | Yes  |
| GET    | /api/interview/               | List all reports    | Yes  |
| GET    | /api/interview/report/:id     | Get single report   | Yes  |
| POST   | /api/interview/resume/pdf/:id | Generate resume PDF | Yes  |

---

## Shadcn UI Components Needed

Based on the application requirements:

- [ ] Button
- [ ] Input
- [ ] Textarea
- [ ] Label
- [ ] Card
- [ ] Progress
- [ ] Badge
- [ ] Alert
- [ ] Dialog
- [ ] Sheet (for sidebar)
- [ ] Tabs
- [ ] Skeleton
- [ ] Separator
- [ ] Avatar
- [ ] Dropdown Menu

---

## File Structure Recommendation

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── interview/
│   │   │   └── new/
│   │   └── reports/
│   │       └── [id]/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── dashboard/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatsCard.tsx
│   │   └── RecentReports.tsx
│   ├── interview/
│   │   ├── ResumeUploader.tsx
│   │   ├── SelfDescriptionForm.tsx
│   │   ├── JobDescriptionForm.tsx
│   │   ├── MatchScoreCard.tsx
│   │   ├── TechnicalQuestions.tsx
│   │   ├── BehavioralQuestions.tsx
│   │   ├── SkillGaps.tsx
│   │   └── PreparationPlan.tsx
│   └── reports/
│       ├── ReportCard.tsx
│       └── ReportsFilter.tsx
├── lib/
│   ├── api.ts
│   └── utils.ts
├── services/
│   ├── auth.service.ts
│   └── interview.service.ts
├── store/
│   ├── index.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── interviewSlice.ts
│   └── hooks.ts
├── types/
│   ├── auth.ts
│   └── interview.ts
└── styles/
    └── globals.css
```

---

## Next Steps

1. Start with **Phase 1** - Install Redux Toolkit and set up the foundation
2. Move to **Phase 2** - Build authentication module
3. Continue sequentially through each phase
4. Test thoroughly before deployment

---

_Generated for AI Job - Interview Preparation App_
