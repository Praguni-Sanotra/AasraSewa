import express from "express";
import {
  adminLogin,
  updatePropertyStatus,
  getAllProperties,
  getPropertyByIdAdmin,
  downloadHealthReport,
  submitAdminReview,
  adminRegister,
} from "../controllers/admin.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js"; // Uncomment if you want to protect routes

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Admin registration
router.post("/register", adminRegister);

// Get all properties
router.get("/properties", getAllProperties);

// Get property by ID (admin)
router.get("/property/:id", getPropertyByIdAdmin);

// Update property status (approve/reject/pending)
router.patch("/property/:id/status", updatePropertyStatus);

// Download health report for a property
router.get("/property/:id/health-report", downloadHealthReport);

// Submit admin review for a property
router.post("/property/:id/review", submitAdminReview);

export default router; 