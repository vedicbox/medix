import AuthMapper from "../mapper/AuthMapper.js";
import StaffMapper from "../mapper/StaffMapper.js";
import AuthRepo from "../repo/auth/AuthRepo.js";
import RoleRepo from "../repo/auth/RoleRepo.js";
import ClinicRepo from '../repo/master/ClinicRepo.js';
import { default as StaffProfileRepo, default as StaffRepo } from "../repo/StaffRepo.js";
import MESSAGES from "../utils/message.js";
import { formatMsg } from "../utils/parse.js";
import { ServiceResponse } from "../utils/responseHandler.js";
import STATUS_CODES from "../utils/statusCodes.js";

/**
 * Service for staff management operations.
 * Handles creation, update, and retrieval of staff profiles and lists.
 */
export default class StaffService {
  /**
   * Create a new staff profile.
   * @param {Object} profileData - Staff profile data
   * @param {Object} authentication - Auth context containing orgCode
   * @returns {Promise<ServiceResponse>}
   */
  static async createStaffProfile(profileData, authentication) {
    const { orgRef } = authentication;
    const role = await RoleRepo.findRoleById(profileData.roleRef);

    if (!role) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.ROLE_NOT_FOUND);
    }

    const clinic = await ClinicRepo.findClinicById(profileData.clinicRef, orgRef);

    if (!clinic) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.CLINIC_NOT_FOUND);
    }

    const userEntity = AuthMapper.toUserEntity(profileData, orgRef);
    const newUser = await AuthRepo.createUser(userEntity);

    const staffProfileEntity = StaffMapper.toStaffProfileEntity(profileData, newUser._id);
    const newProfile = await StaffProfileRepo.createProfile(staffProfileEntity);

    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.STAFF_PROFILE_CREATED, newProfile);
  }

  /**
   * Edit an existing staff profile by ID.
   * @param {string} profileId - Staff profile ID
   * @returns {Promise<Object|null>} - The staff profile or null if not found
   */
  static async editStaffProfile(profileId, authentication) {
    const { orgRef } = authentication;
    const staffData = await StaffRepo.findProfileById(profileId, orgRef);
    return new ServiceResponse(STATUS_CODES.OK, null, staffData);
  }

  /**
   * Update an existing staff profile.
   * @param {Object} profileData - Staff profile data
   * @returns {Promise<ServiceResponse>}
   */
  static async updateStaffProfile(profileData, authentication) {
    const { orgRef } = authentication;
    const role = await RoleRepo.findRoleById(profileData.roleRef, orgRef);
    if (!role) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND_MSG, { label: "Role" }));
    }

    const clinic = await ClinicRepo.findClinicById(profileData.clinicRef, orgRef);
    if (!clinic) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND_MSG, { label: "Clinic" }));
    }

    const userUpdateEntity = AuthMapper.toUserUpdateEntity(profileData);

    const updatedUser = await AuthRepo.updateUser(profileData.userId, userUpdateEntity);
    if (!updatedUser) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }

    const staffProfileUpdateEntity = StaffMapper.toStaffProfileUpdateEntity(profileData);

    const updatedProfile = await StaffRepo.updateProfile(profileData.staffId, staffProfileUpdateEntity);

    if (!updatedProfile) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.STAFF_PROFILE_NOT_FOUND);
    }
    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.STAFF_PROFILE_UPDATED, updatedProfile);
  }

  /**
   * Fetch all staff details for tabular view.
   * @returns {Promise<Array<Object>>}
   */
  static async fetchAll(authentication) {
    const { orgRef } = authentication;
    const stafflist = await StaffRepo.fetchAllStaff(orgRef);

    return new ServiceResponse(STATUS_CODES.OK, null, { stafflist });

  }

  /**
   * Fetch staff list (name and ID) by role name.
   * @param {string} roleName - Role name
   * @returns {Promise<ServiceResponse>}
   */
  static async fetchStaffListByRole(roleName) {
    try {
      if (!roleName) {
        throw new Error(MESSAGES.ROLE_NAME_REQUIRED);
      }
      const staffList = await AuthRepo.fetchUsersByRoleName(roleName);
      if (!staffList || staffList.length === 0) {
        return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.NO_STAFF_FOR_ROLE);
      }
      return new ServiceResponse(STATUS_CODES.OK, null, staffList);
    } catch (error) {
      throw new Error(MESSAGES.UNABLE_TO_FETCH_STAFF + ": " + error.message);
    }
  }
}
