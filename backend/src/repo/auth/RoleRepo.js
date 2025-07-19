import RoleDao from "../../models/auth/RoleDao.js";

export default class RoleRepo {
  
  static async findRoles() {
    return await RoleDao.find({ status: 1 }, { name: 1, _id: 1 });
  }

  static async createRole(roleData) {
    const role = new RoleDao(roleData);
    return await role.save();
  }

  static async updateRole(roleId,roleData) {
    return await RoleDao.findByIdAndUpdate(roleId, roleData, { new: true });
  }

  /**
   * Find a role by its ID
   * @param {string} roleId
   * @returns {Promise<Object|null>}
   */
  static async findRoleById(roleId) {
    return await RoleDao.findById(roleId);
  }

  /**
  * Fetch all active roles
  * @returns {Promise<Array<Object>>}
  */
  static async fetchTableRoles() {
    return await RoleDao.find({ status: { $ne: 3 } });
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
