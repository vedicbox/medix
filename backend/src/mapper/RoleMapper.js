
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


}

export default RoleMapper;