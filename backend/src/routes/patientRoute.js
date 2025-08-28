import PatientController from "@controller/PatientController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(isAuthenticated);

// GET /patients/search - Search patients
router.get("/search", PatientController.searchPatient);

// POST /patients/create - Create a new patient
router.post("/create", PatientController.createPatient);

router.post("/update", PatientController.updatePatient);

router.get("/edit", PatientController.editPatient);

// GET /patients/validate - Validate patient
router.get("/validate", PatientController.validatePatient);

// POST /patients/initiate-consultation - Initiate consultation
router.post("/initiate-consult", PatientController.initiateConsultation);

// GET /patients/align-list - Get alignment list
router.get("/align-list", PatientController.getAlignmentList);

// // PUT /patients/update-status/:id - Update patient status
// router.put("/update-status/:id", PatientController.updateStatus);

export default router;