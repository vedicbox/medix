// routes/patientRoutes.js
import express from "express";
import ClinicController from "../../controller/master/ClinicController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(isAuthenticated);

router.get("/list", ClinicController.getClinicList);

router.get("/all", ClinicController.getAllClinics);

// GET /clinic/:clinicId - Get clinic by ID
router.get("/:clinicId", ClinicController.getClinicById);

// POST /clinic - Create a new clinic
router.post("/create", ClinicController.createClinic);

// PUT /clinic/:clinicId - Update clinic by ID
router.put("/update", ClinicController.updateClinic);


export default router;


