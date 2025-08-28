import AuthService from "@service/auth/AuthService.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";

const AUTH_OPERATIONS = {
  LOGIN: {
    serviceMethod: 'login',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Login'
  },
  AUTH_CHECK: {
    serviceMethod: 'authCheck',
    inputExtractor: (req) => req.auth,
    operationName: 'Authentication check'
  },
};

export default class AuthController {
  /**
   * Generic request handler with enhanced error handling and performance
   * @private
   */
  static async #handleRequest(req, res, operationConfig) {
    try {
      const input = operationConfig.inputExtractor(req);
      const result = await AuthService[operationConfig.serviceMethod](input);

      return HttpHandler.send(res, result);
    } catch (error) {
      console.error(`${operationConfig.operationName} Error:`, error);
      return HttpHandler.error(res, error, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
    }
  }

  /**
   * Authenticate and log in a user
   */
  static async login(req, res) {
    return AuthController.#handleRequest(req, res, AUTH_OPERATIONS.LOGIN);
  }

  /**
   * Verify user authentication status
   */
  static async authCheck(req, res) {
    return AuthController.#handleRequest(req, res, AUTH_OPERATIONS.AUTH_CHECK);
  }
}