import RoleService from "@service/auth/RoleService.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";

const ROLE_OPERATIONS = {
  GET_ALL: {
    serviceMethod: 'getAll',
    inputExtractor: (req) => ({ authentication: req.auth }),
    operationName: 'Get all roles'
  },
  GET_NAMES: {
    serviceMethod: 'getNames',
    inputExtractor: (req) => ({ authentication: req.auth }),
    operationName: 'Get role names'
  },
  GET_ADMIN_LIST: {
    serviceMethod: 'getAdminList',
    inputExtractor: (req) => ({ authentication: req.auth }),
    operationName: 'Get admin list'
  },
  CREATE: {
    serviceMethod: 'create',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Create role'
  },
  UPDATE: {
    serviceMethod: 'update',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Role updation'
  },
  UPDATE_PERMISSIONS: {
    serviceMethod: 'updatePermissions',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Update role permissions'
  },
};

export default class RoleController {
  /**
   * Generic request handler with enhanced error handling and performance
   * @private
   */
  static async #handleRequest(req, res, operationConfig) {
    try {
      const input = operationConfig.inputExtractor(req);
      const result = await RoleService[operationConfig.serviceMethod](input);

      return HttpHandler.send(res, result);
    } catch (error) {
      console.error(`${operationConfig.operationName} Error:`, error);
      return HttpHandler.error(res, error, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
    }
  }

  /**
   * Get all roles
   */
  static async getAll(req, res) {
    return RoleController.#handleRequest(req, res, ROLE_OPERATIONS.GET_ALL);
  }

  /**
   * Get only role names (for dropdowns/selectors)
   */
  static async getNames(req, res) {
    return RoleController.#handleRequest(req, res, ROLE_OPERATIONS.GET_NAMES);
  }

  /**
   * Get admin-specific role list
   */
  static async getAdminList(req, res) {
    return RoleController.#handleRequest(req, res, ROLE_OPERATIONS.GET_ADMIN_LIST);
  }

  /**
   * Create a new role
   */
  static async create(req, res) {
    return RoleController.#handleRequest(req, res, ROLE_OPERATIONS.CREATE);
  }

  /**
   * Update an existing role
   */
  static async update(req, res) {
    return RoleController.#handleRequest(req, res, ROLE_OPERATIONS.UPDATE);
  }

  /**
   * Update permissions for a role
   */
  static async updatePermissions(req, res) {
    return RoleController.#handleRequest(req, res, ROLE_OPERATIONS.UPDATE_PERMISSIONS);
  }
}