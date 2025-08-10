import { DATE_TIME_ENUM } from "../enum/parserEnum.js";
import StaffProfileDao from "../models/staff/StaffProfileDao.js";
import { parseToMongoId } from "@utils/parse.js";

export default class StaffProfileRepo {
  static async createProfile(profileData) {
    const profile = new StaffProfileDao(profileData);
    return await profile.save();
  }

  static async findProfileById(profileId, orgRef) {
    return await StaffProfileDao.findById(profileId)
      .populate({
        path: "userRef",
        select: "firstName lastName email clinicRef",
        match: { orgRef },
        populate: [
          {
            path: "roleRef",
            select: "_id"
          },
          {
            path: "clinicRef",
            select: "_id"
          }
        ]
      });
    
  }

  static async updateProfile(profileId, profileData) {
    return await StaffProfileDao.findByIdAndUpdate(profileId, profileData, {
      new: true,
      runValidators: true
    });
  }


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
                orgRef:parseToMongoId(orgRef)
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
            { $unwind: "$roleRef" },
            {
              $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                orgCode: 1,
                "roleRef.name": 1
              }
            }
          ],
          as: "userRef"
        }
      },
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
              default: "$gender"
            }
          },
          createdAt: { $dateToString: { format: DATE_TIME_ENUM.DEFAULT, date: "$createdAt" } }
        }
      },
      {
        $project: {
          phone1: 1,
          gender: 1,
          createdAt: 1,
          "userRef.firstName": 1,
          "userRef.lastName": 1,
          "userRef.email": 1,
          "userRef.orgCode": 1,
          "userRef.roleRef.name": 1
        }
      }
    ]);
  }

}
