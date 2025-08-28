import OrgController from "@controller/adminstrator/OrgController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(isAuthenticated);

// Fetch all organizations
router.get("/fetch-all", OrgController.getAll);

// Create new organization
router.post("/create", OrgController.create);

// Update organization details
router.post("/update", OrgController.update);

// Update admin details for organization
router.post("/admin/update", OrgController.updateAdmin);

// Get organization data for editing
router.get("/edit", OrgController.getEditData);

// Get admin data for editing
router.get("/admin/edit", OrgController.getAdminEditData);

export default router;