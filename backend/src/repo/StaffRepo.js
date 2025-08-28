import { parseToMongoId } from "@utils/parse.js";
import { DATE_TIME_ENUM } from "../enum/parserEnum.js";
import StaffProfileDao from "@models/staff/StaffProfileDao.js";

export default class StaffProfileRepo {
  /**
   * Create a new staff profile
   * @param {Object} profileData - Staff profile data
   * @returns {Promise<Object>} - Created profile
   */
  static async createProfile(profileData) {
    return await StaffProfileDao.create(profileData);
  }

  /**
   * Find admin by organization ID
   * @param {string} orgId - Organization ID
   * @returns {Promise<Object>} - Admin profile
   */
  static async findAdminByOrgId(orgId) {
    return await StaffProfileDao.findOne()
      .populate({
        path: "userRef",
        select: "firstName lastName email",
        populate: {
          path: "roleRef",
          select: "name _id"
        }
      })
      .lean();

  }

  /**
   * Find profile by ID with organization reference
   * @param {string} profileId - Profile ID
   * @param {string} orgRef - Organization reference
   * @returns {Promise<Object>} - Staff profile
   */
  static async findProfileById(profileId, orgRef) {
    return await StaffProfileDao.findById(profileId)
      .populate({
        path: "userRef",
        select: "firstName lastName email clinicRef status",
        match: {
          orgRef: parseToMongoId(orgRef),
        },
        populate: [
          {
            path: "roleRef",
            select: "_id name permissions"
          },
          {
            path: "clinicRef",
            select: "_id name code"
          }
        ]
      })
      .lean();
  }

  /**
   * Update staff profile
   * @param {string} profileId - Profile ID
   * @param {Object} profileData - Profile update data
   * @returns {Promise<Object>} - Updated profile
   */
  static async updateProfile(profileId, profileData) {
    return await StaffProfileDao.findByIdAndUpdate(
      profileId,
      profileData,
      {
        new: true,
        runValidators: true,
        select: "-__v" // Exclude version key
      }
    ).lean();
  }

  /**
   * Fetch all staff for an organization with optimized aggregation
   * @param {string} orgRef - Organization reference
   * @returns {Promise<Array>} - List of staff profiles
   */
  static async fetchAllStaff(orgRef) {
    return StaffProfileDao.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userRefId: "$userRef" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userRefId"] },
                orgRef: parseToMongoId(orgRef)
              }
            },
            {
              $lookup: {
                from: "roles",
                localField: "roleRef",
                foreignField: "_id",
                as: "roleRef"
              }
            },
            { $unwind: { path: "$roleRef", preserveNullAndEmptyArrays: true } }
          ],
          as: "userRef"
        }
      },
      { $match: { "userRef.0": { $exists: true } } },
      { $unwind: "$userRef" },
      {
        $addFields: {
          gender: {
            $switch: {
              branches: [
                { case: { $eq: ["$gender", "M"] }, then: "Male" },
                { case: { $eq: ["$gender", "F"] }, then: "Female" },
                { case: { $eq: ["$gender", "O"] }, then: "Other" }
              ],
              default: "Not Specified"
            }
          },
          fullName: { $concat: ["$userRef.firstName", " ", "$userRef.lastName"] }
        }
      },
      {
        $project: {
          _id: 1,
          phone1: 1,
          gender: 1,
          createdAt: { $dateToString: { format: DATE_TIME_ENUM.DEFAULT, date: "$createdAt" } },
          fullName: 1,
          "userRef.email": 1,
          "userRef.orgCode": 1,
          "userRef.roleRef.name": 1
        }
      }
    ]);
  }


  /**
   * Find staff profiles by user IDs (batch operation)
   * @param {Array} userIds - Array of user IDs
   * @returns {Promise<Array>} - Staff profiles
   */
  static async findProfilesByUserIds(userIds) {
    return StaffProfileDao.find({
      userRef: { $in: userIds }
    })
      .select("userRef phone1 gender")
      .lean();
  }

  /**
   * Count total active staff in organization
   * @param {string} orgRef - Organization reference
   * @returns {Promise<number>} - Count of active staff
   */
  static async countActiveStaff(orgRef) {
    const orgId = parseToMongoId(orgRef);

    return StaffProfileDao.countDocuments({
      userRef: {
        $in: await StaffProfileDao.distinct("userRef", {
          "userRef.orgRef": orgId,
          "userRef.status": "ACTIVE"
        })
      }
    });
  }
}