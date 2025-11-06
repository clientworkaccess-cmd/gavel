import express from "express";
import {
  dashboardController,
  emailVerificationController,
  forgotPasswordController,
  loginController,
  logoutController,
  refreshTokenController,
  resendOtpController,
  resetPasswordController,
  signupController,
} from "../controller/authController.js";

import { verifyToken } from "../middleware/verificationMiddleware.js";

import {
  deleteUserByAdmin,
  getAdmins,
  getAllUsers,
  getCandidates,
  getClients,
  getUserById,
  updateUser,
} from "../controller/userController.js";

import {
  addCompany,
  deleteCompany,
  getCompanies,
  getCompaniesName,
  getCompanyById,
  updateCompany,
} from "../controller/companyController.js";

import {
  checkCandidateApplied,
  createInterview,
  deleteInterview,
  getAllInterviews,
  getCandidateInterviews,
  updateReviewStatus,
} from "../controller/interviewController.js";

import {
  addPosition,
  deletePosition,
  getPositionById,
  getPositions,
  updatePosition,
} from "../controller/positionController.js";

import { sendEmail } from "../controller/emailControler.js";


const router = express.Router();


// ------------------- AUTH ROUTES ------------------- //
router.post("/api/signup", signupController);
router.post("/api/login", loginController);
router.post("/api/logout", logoutController);
router.post("/api/resend-otp/:token", resendOtpController);
router.post("/api/verify-email/:token", emailVerificationController);
router.post("/api/request-password-reset", forgotPasswordController);
router.post("/api/reset-password/:token", resetPasswordController);

// ------------------- USER ROUTES ------------------- //
router.get("/api/users", verifyToken, getAllUsers);
router.get("/api/users/:id", verifyToken, getUserById);
router.get("/api/clients", verifyToken, getClients);
router.get("/api/candidates", verifyToken, getCandidates);
router.get("/api/admins", verifyToken, getAdmins);
router.put("/api/users/:id", verifyToken, updateUser);
router.delete("/api/users/:id", verifyToken, deleteUserByAdmin);

// ------------------- COMPANY ROUTES ------------------- //
router.post("/api/company", verifyToken, addCompany);
router.get("/api/company", verifyToken, getCompanies);
router.get("/api/company/:id", verifyToken, getCompanyById);
router.get("/api/companies-names", verifyToken, getCompaniesName);
router.put("/api/company/:id", verifyToken, updateCompany);
router.delete("/api/company/:id", verifyToken, deleteCompany);

// ------------------- POSITION ROUTES ------------------- //
router.post("/api/position", verifyToken, addPosition);
router.get("/api/position", verifyToken, getPositions);
router.get("/api/position/:id", verifyToken, getPositionById);
router.put("/api/position/:id", verifyToken, updatePosition);
router.delete("/api/position/:id", verifyToken, deletePosition);

// ------------------- INTERVIEW ROUTES ------------------- //
router.post("/api/interview", verifyToken, createInterview);
router.get("/api/interview", verifyToken, getAllInterviews);
router.get("/api/interview/check", verifyToken, checkCandidateApplied);
router.get("/api/interview/:candidateId", verifyToken, getCandidateInterviews);
router.put("/api/interview/:id", verifyToken, updateReviewStatus);
router.delete("/api/interview/:id", verifyToken, deleteInterview);

// ------------------- OTHER ROUTES ------------------- //
router.get("/api/dashboard", verifyToken, dashboardController);
router.get("/api/refresh-token", refreshTokenController);
router.post("/api/send-email", sendEmail);


export default router;
