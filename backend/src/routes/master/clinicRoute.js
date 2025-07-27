// routes/patientRoutes.js
import express from "express";
import ClinicController from "../../controller/master/ClinicController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(isAuthenticated);

// GET /clinic/org/:orgCode - Get clinics by organization code
router.get("/list", ClinicController.getClinicList);

// GET /clinic - Get all clinics
router.get("/all", ClinicController.getAllClinics);

// GET /clinic/:clinicId - Get clinic by ID
router.get("/:clinicId", ClinicController.getClinicById);

// POST /clinic - Create a new clinic
router.post("/create", ClinicController.createClinic);

// PUT /clinic/:clinicId - Update clinic by ID
router.put("/update", ClinicController.updateClinic);


export default router;


