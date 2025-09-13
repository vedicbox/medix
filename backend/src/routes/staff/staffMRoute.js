import StaffMController from "@controller/staff/StaffMController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.use(isAuthenticated);

router.post("/create", StaffMController.create);
router.get("/fetch-all", StaffMController.fetchAll);

export default router; 