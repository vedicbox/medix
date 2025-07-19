import bcrypt from "bcryptjs";
import AuthRepo from "../../repo/auth/AuthRepo.js";
import JWT_UTILS from "../../utils/jwtUtils.js";
import MESSAGES from "../../utils/message.js";
import STATUS_CODES from "../../utils/statusCodes.js";
import { ServiceResponse } from "../../utils/responseHandler.js";

/**
 * Service for authentication operations.
 * Handles user authentication, login, and session management.
 */
export default class AuthService {
  /**
   * User authentication check.
   * @param {Object} authentication - { userId, orgCode }
   * @returns {Promise<ServiceResponse>}
   */
  static async authCheck(authentication) {
    const { userId, orgCode } = authentication;
    try {
      const user = await AuthRepo.findUserSessionInfo(userId, orgCode);
      return user
        ? new ServiceResponse(STATUS_CODES.OK, null, { user })
        : new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    } catch (error) {
      console.error("Auth Check Error:", error);
      return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * User login.
   * @param {Object} credentials - { email, orgCode, password }
   * @returns {Promise<ServiceResponse>}
   */
  static async login({ email, orgCode, password }) {
    try {
      // 1. Find user with password field
      const user = await AuthRepo.findUserByFields({ email, orgCode }, "+password");
      if (!user) {
        return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.INVALID_CREDENTIALS);
      }
      // 2. Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return new ServiceResponse(STATUS_CODES.UNAUTHORIZED, MESSAGES.INVALID_CREDENTIALS);
      }
      // 3. Generate token
      const token = JWT_UTILS.generateToken({
        userId: user._id,
        orgCode: user.orgCode
      });
      if (!token) {
        return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.TOKEN_GENERATION_FAILED);
      }
      // 4. Get user data without sensitive fields
      const userData = await AuthRepo.findUserSessionInfo(user._id, orgCode);
      return new ServiceResponse(STATUS_CODES.OK, MESSAGES.LOGIN_SUCCESSFUL, {
        access_token: token,
        user: userData,
      });
    } catch (error) {
      console.error("Login Error:", error);
      return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
}