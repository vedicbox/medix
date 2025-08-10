import OrgController from "@controller/adminstrator/OrgController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.use(isAuthenticated);

router.post("/create", OrgController.create);
router.get("/find-all", OrgController.findAll);
// router.post("/update", OrgController.update);

export default router;


