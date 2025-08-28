import UserDao from "@models/auth/UserDao.js";
import { parseToMongoId } from "@utils/parse.js";

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

    return query.lean().exec();
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
   * @param {string} orgRef - Organization reference
   * @returns {Promise<Array<{ _id: string, name: string }>>}
   */
  static async fetchUsersByRoleName(roleName, orgRef) {
    return await UserDao.aggregate([
      // Lookup roles to filter by role name
      {
        $lookup: {
          from: "roles",
          localField: "roleRef",
          foreignField: "_id",
          as: "role",
          pipeline: [
            {
              $match: {
                name: roleName,
                orgRef: parseToMongoId(orgRef),
                type: 1
              }
            }
          ]
        }
      },
      // Filter users who have the matching role
      {
        $match: {
          "role.0": { $exists: true }
        }
      },
      // Project only required fields
      {
        $project: {
          _id: 1,
          name: {
            $trim: {
              input: { $concat: ["$firstName", " ", "$lastName"] }
            }
          }
        }
      }
    ]);
  }


  /**
   * Find user session info (without sensitive data)
   * @param {string} userId - User ID
   * @param {string} org - Organization code
   * @returns {Promise<Object|null>} - Lean user object
   */
  static async findUserSessionInfo(userRef, orgRef) {
    return UserDao.findOne({ _id: userRef, orgRef })
      .select('-password')
      .populate('roleRef', 'name status permission')
      .populate('clinicRef', 'name')
      .lean();
  }

}