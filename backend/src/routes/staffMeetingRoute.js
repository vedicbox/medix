import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import StaffMeetingController from "../controller/StaffMeetingController.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/staffMeeting/create", StaffMeetingController.create);
router.post("/staffMeeting/fetchAll", StaffMeetingController.fetchAll);

export default router;