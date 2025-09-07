import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";
import SpecsController from '../../controller/master/SpecsController.js'

const router = express.Router();
router.use(isAuthenticated);

//  Get all specialization
router.get("/fetch-all", SpecsController.getAll);
//  Get role names only
router.get("/names", SpecsController.getNames);
//  Create a new specialization
router.post("/create", SpecsController.create);
// update specialization
router.post("/update", SpecsController.update);

export default router;
