import express from "express";
import {
  getDashboardStats,
  updateMentorStatus,
} from "../controller/admin.controller.js";
import { authenticate, isAdmin } from "../middleware/auth.midlleware.js"

const router = express.Router();

// Apply protection to ALL routes in this file
router.use(authenticate);
router.use(isAdmin);

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard metrics and recent activity
 * @access  Private (Admin only)
 */
router.get("/stats", getDashboardStats);

/**
 * @route   PATCH /api/admin/mentor-status/:id
 * @desc    Approve or Reject a mentor application
 * @access  Private (Admin only)
 */
router.patch("/mentor-status/:id", updateMentorStatus);

export default router;
