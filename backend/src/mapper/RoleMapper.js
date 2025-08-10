import { AUTH_ENUM } from "../enum/authEnum.js";

class RoleMapper {
    /**
     * Maps role data to a Role model instance
     * @param {Object} roleData - Input role data
     * @param {string} roleData.name - Role name
     * @param {number|boolean} [roleData.status] - Role status (optional)
     * @returns {Role} - New Role instance
     * @throws {Error} If required name is missing or invalid
     */
    static createRoleMapper(roleData) {
        return {
            name: roleData.name.trim().toUpperCase(),
            status: roleData.status ?? 1
        };
    }

    static getAdminstratorRole(orgRef) {
        return {
            name: AUTH_ENUM.ROLES.ADMINSTRATOR,
            status: 1,
            type: 3,
            permission: [0],
            orgRef
        };
    }

}

export default RoleMapper;