import OrgRepo from "@repo/adminstrator/OrgRepo.js";
import AuthRepo from "@repo/auth/AuthRepo.js";
import JWT_UTILS from "@utils/jwtUtils.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";
import bcrypt from "bcryptjs";

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
    const user = await AuthRepo.findUserSessionInfo(userRef, orgRef);
    return user
      ? new ServiceResponse(STATUS_CODES.OK, null, { user })
      : new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Authentication" }));
  }

  /**
   * User login.
   * @param {Object} credentials - { email, orgCode, password }
   * @returns {Promise<ServiceResponse>}
   */
  static async login({ packet: { email, orgCode, password } }) {

    const orgRes = await OrgRepo.findByFields({ orgCode, status: 1 }, "+_id");

    if (!orgRes) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.INVALID_CREDENTIALS);
    }

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
      role: userData.roleRef.name,
      permission: userData.roleRef.permission
    });

    if (!token) {
      return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, formatMsg(MESSAGES.TRY_AGAIN, { label: "Login" }));
    }

    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.LOGIN_SUCCESSFUL, {
      access_token: token,
      user: userData,
    });

  }
}