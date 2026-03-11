import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import interviewController from "../controllers/interview.controller.js";
import upload from "../middleware/file.middleware.js";

const interviewRouter = Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  interviewController.generateInterViewReportController,
);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get(
  "/report/:interviewId",
  authUser,
  interviewController.getInterviewReportByIdController,
);

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get(
  "/",
  authUser,
  interviewController.getAllInterviewReportsController,
);

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authUser,
  interviewController.generateResumePdfController,
);

/**
 * @route DELETE /api/interview/:interviewId
 * @description delete an interview report by ID.
 * @access private
 */
interviewRouter.delete(
  "/:interviewId",
  authUser,
  interviewController.deleteInterviewReportController,
);

export default interviewRouter;
