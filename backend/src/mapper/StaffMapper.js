import { defaultDateFormatter } from "../utils/parse.js";

class StaffMapper {
  /**
   * Maps profile data to a staff profile entity
   * @param {Object} profileData - Input profile data
   * @param {string} profileData.phone1 - Primary phone number
   * @param {string} [profileData.phone2] - Secondary phone number
   * @param {boolean} [profileData.whatsappPref] - WhatsApp preference
   * @param {string} profileData.gender - Gender
   * @param {Date|string} profileData.dob - Date of birth
   * @param {string} profileData.country - Country
   * @param {string} profileData.state - State
   * @param {string} profileData.city - City
   * @param {string} profileData.pincode - Postal code
   * @param {string} profileData.address - Full address
   * @param {string} userId - Associated user ID
   * @returns {Object} Staff profile entity
   * @throws {Error} If required fields are missing
   */
  static toStaffProfileEntity(profileData, userRef) {
    return {
      phone1: profileData.phone1,
      phone2: profileData.phone2 || null,
      whatsappPref: profileData.whatsappPref,
      gender: profileData.gender,
      dob: profileData.dob,
      country: profileData.country,
      state: profileData.state,
      city: profileData.city,
      pincode: profileData.pincode,
      address: profileData.address,
      userRef: userRef
    };
  }

  /**
   * Maps update data for staff profile
   * @param {Object} profileData - Update data
   * @param {string} userId - User ID for reference
   * @returns {Object} Sanitized update object
   */
  static toStaffProfileUpdateEntity(profileData) {
    return {
      phone1: profileData.phone1,
      phone2: profileData.phone2 || null,
      whatsappPref: profileData.whatsappPref,
      gender: profileData.gender,
      dob: profileData.dob,
      country: profileData.country,
      state: profileData.state,
      city: profileData.city,
      pincode: profileData.pincode,
      address: profileData.address,
    };
  }

  static toStaffTableResponseMapper(datalist) {
    return datalist.map(profileData => ({
      ...profileData,
      gender: profileData.gender === "M" ? "Male" : profileData.gender === "F" ? "Female" : profileData.gender === "O" ? "Other" : profileData.gender,
      createdAt: defaultDateFormatter(profileData.createdAt)
    }));
  }
}

export default StaffMapper;