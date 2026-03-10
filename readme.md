# Full-Stack AI Job Preparation Platform

A production-ready Gen AI application designed to help users bridge the gap between their current skills and their dream jobs. This platform simulates a real-world product where users can upload resumes, analyze job descriptions, detect skill gaps, and generate ATS-optimized resumes and interview questions using the Gemini API.

---

## 🚀 Key Features

### 🔐 Secure Authentication & Authorization

- **JWT Implementation:** Robust user sessions using JSON Web Tokens.
- **Token Blacklisting:** Enhanced security for logout and session management to prevent unauthorized access.

### 📄 Resume Processing & Analysis

- **Skill Extraction:** Automated parsing of uploaded resumes to identify core competencies.
- **Skill Gap Detection:** AI-driven analysis comparing user resumes against specific job descriptions.
- **ATS Optimization:** Generation of resumes designed to rank higher in Applicant Tracking Systems.

### 🤖 AI-Powered Interview Prep

- **Dynamic Question Generation:** Tailored interview questions based on the user's background and the target role.
- **Gemini API Integration:** Leverages Google's state-of-the-art AI for natural language processing.

### 🛠 Dynamic PDF Creation

- **Puppeteer Integration:** High-quality, professional PDF generation for resumes directly from the web application.

---

## 💻 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **AI Engine:** Gemini API
- **PDF Generation:** Puppeteer

---

## 🏗 Project Structure (Frontend)

The frontend follows a **feature-based folder structure** to ensure scalability and maintainability:

- **Pages:** Contains full-page components (e.g., Login, Register, Dashboard).
- **Components:** Reusable UI elements used across different pages.
- **State Management (Context API):** Manages global state using `Auth.Context.jsx` for sessions and `AI.Context.jsx` for AI-related data.
- **API Services:** Handles centralized API calls to the backend (e.g., `Auth.Api.js`, `Interview.Api.js`).
- **Custom Hooks:** Provides reusable logic, such as `useAuth`, for authentication-related functionalities.

---

## 📚 Core Concepts Learned

- **Full Stack Architecture:** Designing a scalable connection between React and Node.js.
- **Secure Auth Flows:** Implementing login, registration, and secure logout via token blacklisting.
- **AI Integration:** Prompt engineering and API handling with Google Gemini.
- **Parsing Logic:** Writing logic for resume parsing and skill extraction.
- **Real-World Structuring:** Organizing a production-ready codebase for professional environments.

---

## 🛠 Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Environment Variables:**
    Create a `.env` file in the root of the backend directory and add your credentials:
    - `MONGODB_URI`
    - `JWT_SECRET`
    - `GEMINI_API_KEY`

5.  **Run the Application:**

    ```bash
    # Run backend (from backend folder)
    npm start

    # Run frontend (from frontend folder)
    npm run dev
    ```

---

## 📄 License

This project is licensed under the MIT License.

frontend/
├── app/ # Next.js App Router
│ ├── (auth)/ # Auth group route
│ │ ├── login/
│ │ └── register/
│ ├── (dashboard)/ # Protected routes
│ │ ├── dashboard/ # Main dashboard
│ │ ├── reports/ # Reports list
│ │ ├── create/ # Create new report
│ │ └── report/[id]/ # Single report view
│ ├── layout.tsx # Root layout
│ └── page.tsx # Landing/redirect
├── components/
│ ├── auth/ # Auth-related components
│ ├── dashboard/ # Dashboard components
│ ├── reports/ # Report components
│ └── ui/ # shadcn components (already exists)
├── lib/ # Utilities
│ ├── api.ts # API calls (exists)
│ ├── utils.ts # Helpers (exists)
│ └── constants.ts # API endpoints
├── store/ # State management
│ ├── auth-store.ts # Auth state (exists)
│ ├── report-store.ts # Report state
│ └── ui-store.ts # UI state (loading, errors)
├── hooks/ # Custom hooks
│ ├── use-auth.ts # Auth hooks
│ ├── use-reports.ts # Report hooks
│ └── use-fetch.ts # Data fetching
└── types/ # TypeScript types
├── auth.types.ts
└── report.types.ts
