import bcrypt from "bcryptjs";
import OrgRepo from "../../repo/adminstrator/OrgRepo.js";
import AuthRepo from "../../repo/auth/AuthRepo.js";
import JWT_UTILS from "../../utils/jwtUtils.js";
import MESSAGES from "../../utils/message.js";
import { ServiceResponse } from "../../utils/responseHandler.js";
import STATUS_CODES from "../../utils/statusCodes.js";

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
    const { userRef, orgRef } = authentication;
    try {
      const user = await AuthRepo.findUserSessionInfo(userRef, orgRef);
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

      const orgRes = await OrgRepo.findOrgByFields({ orgCode }, "+_id");

      const user = await AuthRepo.findUserByFields({ email, orgRef: orgRes._id }, "_id password");

      if (!user) {
        return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.INVALID_CREDENTIALS);
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return new ServiceResponse(STATUS_CODES.UNAUTHORIZED, MESSAGES.INVALID_CREDENTIALS);
      }


      const userData = await AuthRepo.findUserSessionInfo(user._id, orgRes.id);

      const token = JWT_UTILS.generateToken({
        userRef: userData._id,
        orgRef: orgRes._id,
        clinicRef: userData.clinicRef,
        role: userData.roleRef.name
      });

      if (!token) {
        return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.TOKEN_GENERATION_FAILED);
      }

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