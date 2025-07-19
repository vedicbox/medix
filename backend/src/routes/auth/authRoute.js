import express from "express";
import AuthController from "../../controller/auth/AuthController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const authRouter = express.Router();


authRouter.route("/login")
  .post(AuthController.login);

// Protected routes
authRouter.use(isAuthenticated)
  .route("/validate")
  .get(AuthController.authCheck);

export default authRouter;