import RoleMapper from "../../mapper/RoleMapper.js";
import RoleRepo from "../../repo/auth/RoleRepo.js";
import MESSAGES from "../../utils/message.js";
import { ServiceResponse } from "../../utils/responseHandler.js";
import STATUS_CODES from "../../utils/statusCodes.js";

/**
 * Service for role management operations.
 * Handles creation, update, and permission management for roles.
 */
export default class RoleService {
  /**
   * Fetch all role names.
   * @returns {Promise<ServiceResponse>}
   */
  static async findActiveRoles(authentication) {
    const { orgRef } = authentication;
    const roles = await RoleRepo.findActiveRoles(orgRef);
    return new ServiceResponse(STATUS_CODES.OK, null, roles);
  }

  /**
   * Create a new role.
   * @param {Object} roleData - Role data
   * @returns {Promise<ServiceResponse>}
   */
  static async createRole(roleData, authentication) {
    const { orgRef } = authentication;
    const createObj = RoleMapper.createRoleMapper(roleData);
    createObj.orgRef = orgRef;

    await RoleRepo.createRole(createObj);
    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.ROLE_CREATED, null);
  }

  /**
   * Update an existing role.
   * @param {Object} roleData - Role data
   * @returns {Promise<ServiceResponse>}
   */
  static async updateRole(roleData) {
    const updateObj = RoleMapper.createRoleMapper(roleData);
    const updatedRole = await RoleRepo.updateRole(roleData._id, updateObj);
    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.ROLE_UPDATED, updatedRole);
  }

  /**
   * Fetch the list of available roles (active roles).
   * @returns {Promise<ServiceResponse>}
   */
  static async fetchAll(authentication) {
    const { orgRef } = authentication;
    const availableRoles = await RoleRepo.fetchAllRoles(orgRef);
    return new ServiceResponse(STATUS_CODES.OK, null, { rolelist: availableRoles });
  }

  /**
   * Update permissions for a role.
   * @param {string} roleId - Role ID
   * @param {Array<string>} permissions - Permissions to set
   * @returns {Promise<ServiceResponse>}
   */
  static async updateRolePermissions(roleId, permissions) {
    const updatedRole = await RoleRepo.updateRolePermissions(roleId, permissions);
    if (!updatedRole) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.ROLE_NOT_FOUND_GENERIC);
    }
    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.PERMISSIONS_UPDATED, updatedRole);
  }
}
