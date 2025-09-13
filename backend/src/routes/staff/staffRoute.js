import StaffController from "@controller/staff/StaffController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(isAuthenticated);

//  Get all staff
router.get("/fetch-all", StaffController.fetchAllStaff);

// Create staff
router.post("/create", StaffController.createStaffProfile);

// Get staff by ID
router.get("/edit", StaffController.getStaffById);

// Update staff
router.post("/update", StaffController.updateStaffProfile);

//  Get staff by role
router.get("/by-role", StaffController.fetchStaffListByRole);

export default router;