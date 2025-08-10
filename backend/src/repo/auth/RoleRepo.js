import RoleDao from "../../models/auth/RoleDao.js";

export default class RoleRepo {

  static async findActiveRoles(orgRef) {
    return await RoleDao.find({ status: 1, orgRef, type: 1 }, { name: 1, _id: 1 });
  }

  static async createRole(roleData) {
    const role = new RoleDao(roleData);
    return await role.save();
  }

  static async updateRole(roleId, roleData) {
    return await RoleDao.findByIdAndUpdate(roleId, roleData, { new: true });
  }

  /**
   * Find a role by its ID
   * @param {string} roleId
   * @returns {Promise<Object|null>}
   */
  static async findRoleById(roleId, orgCode) {
    return await RoleDao.findById({ _id: roleId, orgCode });
  }

  /**
  * Fetch all active roles
  * @returns {Promise<Array<Object>>}
  */
  static async fetchAllRoles(orgRef) {
    return await RoleDao.find({ orgRef, type: 1 });
  }

  /**
   * Update permissions for a role
   * @param {string} roleId
   * @param {Array<string>} permissions
   * @returns {Promise<Object|null>}
   */
  static async updateRolePermissions(roleId, permissions) {
    return await RoleDao.findByIdAndUpdate(
      roleId,
      { $set: { permission: permissions } },
      { new: true }
    );
  }

}
