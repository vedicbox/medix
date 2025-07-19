import StaffProfileDao from "../models/staff/StaffProfileDao.js";

export default class StaffProfileRepo {
  static async createProfile(profileData) {
    const profile = new StaffProfileDao(profileData);
    return await profile.save();
  }

  static async findProfileById(profileId) {
    return await StaffProfileDao.findById(profileId).populate({
      path: "userRef",
      select: "firstName lastName email",
      populate: [
        {
          path: "roleRef", 
          select: "_id", 
        },
      ],
    }); 
  }

  static async updateProfile(profileId, profileData) {
    return await StaffProfileDao.findByIdAndUpdate(profileId, profileData, {
      new: true,
      runValidators: true
    });
  }

  /**
   * Fetch all staff details
   * @returns {Promise<Array<Object>>}
   */
  static async fetchAllStaff() {
    return await StaffProfileDao.find({})
      .populate({
        path: "userRef",
        select: "firstName lastName email",
        populate: {
          path: "roleRef",
          select: "name",
        },
      })
      .select("phone1 gender createdAt")
      .lean();

  }
}
