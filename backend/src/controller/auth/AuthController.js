import AuthService from "../../service/auth/AuthService.js";
import MESSAGES from "../../utils/message.js";
import { HttpHandler } from "../../utils/responseHandler.js";

/**
 * Controller for authentication-related endpoints.
 * Handles user registration, login, and authentication check.
 */
export default class AuthController {
  /**
   * Register a new user.
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  static async signUp(req, res) {
    try {
      const result = await AuthService.signUp(req.body);
      return HttpHandler.send(res, result);
    } catch (error) {
      return HttpHandler.error(
        res,
        error,
        MESSAGES.REGISTRATION_FAILED
      );
    }
  }

  /**
   * Log in a user.
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  static async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return HttpHandler.send(res, result);
    } catch (error) {
      return HttpHandler.error(
        res,
        error,
        MESSAGES.LOGIN_FAILED
      );
    }
  }

  /**
   * Check authentication status of a user.
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  static async authCheck(req, res) {
    try {
      const result = await AuthService.authCheck(req.auth);
      return HttpHandler.send(res, result);
    } catch (error) {
      return HttpHandler.error(
        res,
        error,
        MESSAGES.AUTH_CHECK_FAILED
      );
    }
  }
}
