import ClinicController from "@controller/master/ClinicController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(isAuthenticated);

//  Get all clinics
router.get("/fetch-all", ClinicController.fetchAll);

// Get clinic by ID
router.get("/edit", ClinicController.getClinicById);

//  Create a new clinic
router.post("/create", ClinicController.create);

//  Update clinic by ID
router.post("/update", ClinicController.update);

router.get("/names", ClinicController.getNames);

export default router;