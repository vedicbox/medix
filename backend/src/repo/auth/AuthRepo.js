import RoleDao from "../../models/auth/RoleDao.js";
import UserDao from "../../models/auth/UserDao.js";

export default class AuthRepo {
  /**
   * Find a user by specified fields
   * @param {Object} queryFields - Fields to query by (e.g., { email, orgCode })
   * @param {string|Object} [selectFields=null] - Fields to include/exclude
   * @returns {Promise<import("mongoose").Document|null>}
   */
  static async findUserByFields(queryFields, selectFields = null) {
    const query = UserDao.findOne(queryFields);

    if (selectFields) {
      query.select(selectFields);
    }

    return query.exec();
  }

  /**
 * Create a new user
 * @param {Object} userData - User data object
 * @returns {Promise<Object>} - The created user document
 */
  static async createUser(userData) {
    const user = new UserDao(userData);
    return await user.save();
  }

  /**
 * Update a user by ID
 * @param {string} userId - The user's ObjectId
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object|null>} - The updated user document
 */
  static async updateUser(userId, updateData) {
    return await UserDao.findByIdAndUpdate(userId, updateData, { new: true });
  }


  /**
   * Fetch users' names and IDs by role name
   * @param {string} roleName - Role name to filter users
   * @returns {Promise<Array<{ id: string, name: string }>>}
   */
  static async fetchUsersByRoleName(roleName) {
    // Step 1: Fast indexed query on Role
    const role = await RoleDao.findOne({ name: roleName }).select("_id").lean();
    if (!role) return [];

    // Step 2: Filter users directly with indexed roleRef
    return await UserDao.aggregate([
      { $match: { roleRef: role._id } },
      {
        $project: {
          _id: 1,
          name: { $concat: ["$firstName", " ", "$lastName"] },
        },
      },
    ]);

  }


  /**
   * Find user session info (without sensitive data)
   * @param {string} userId - User ID
   * @param {string} org - Organization code
   * @returns {Promise<Object|null>} - Lean user object
   */
  static async findUserSessionInfo(userId, orgCode) {
    return UserDao.findOne({ _id: userId, orgCode })
      .select('-password -updatedAt -createdAt -__v')
      .populate({
        path: 'roleRef',
        select: 'name status permission',
        options: { lean: true }
      })
      .lean()
      .exec();
  }

}