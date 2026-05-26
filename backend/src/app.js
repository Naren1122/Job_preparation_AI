import express from "express";
import router from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express(); // Create an Express application
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));

app.use("/api/auth", router);
app.use("/api/interview", interviewRouter);

export default app; // Export the Express application
