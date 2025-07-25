// routes/patientRoutes.js
import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import PatientController from "../controller/PatientController.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/search", PatientController.searchPatient);
router.post("/create", PatientController.createPatient);
router.post("/update", PatientController.updatePatient);
router.get("/validate", PatientController.validatePatient);
router.post("/initiate-consult", PatientController.initiateConsult);
router.get("/align-list", PatientController.alignPatientList);
router.post("/change-status", PatientController.changeStatus);


export default router;


