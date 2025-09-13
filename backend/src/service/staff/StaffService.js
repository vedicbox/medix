import AuthMapper from "@mapper/AuthMapper.js";
import StaffMapper from "@mapper/StaffMapper.js";
import AuthRepo from "@repo/auth/AuthRepo.js";
import RoleRepo from "@repo/auth/RoleRepo.js";
import ClinicRepo from '@repo/master/ClinicRepo.js';
import SpecsRepo from "@repo/master/SpecsRepo.js";
import StaffProfileRepo from "@repo/staff/StaffRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

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
  static async createStaffProfile({ packet, authentication }) {
    const { orgRef } = authentication;
    const role = await RoleRepo.getById(packet.roleRef, orgRef);

    if (!role) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Role" }));
    }

    const clinic = await ClinicRepo.isExists({ _id: packet.clinicRef, orgRef });

    if (!clinic) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Clinic" }));
    }

    const specs = await SpecsRepo.isExists({ _id: packet.specsRef, orgRef });
    if (!specs) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Specialization" }));
    }

    const userEntity = AuthMapper.toUserEntity(packet, orgRef);
    const newUser = await AuthRepo.createUser(userEntity);

    const staffProfileEntity = StaffMapper.toStaffProfileEntity(packet, newUser._id);
    await StaffProfileRepo.createProfile(staffProfileEntity);

    return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.CREATE, { label: "Staff profile" }), null);
  }

  /**
   * Edit an existing staff profile by ID.
   * @param {string} profileId - Staff profile ID
   * @returns {Promise<Object|null>} - The staff profile or null if not found
   */
  static async editStaffProfile({ staffId, authentication }) {
    const { orgRef } = authentication;
    const staffData = await StaffProfileRepo.findProfileById(staffId, orgRef);
    return new ServiceResponse(STATUS_CODES.OK, null, staffData);
  }

  /**
   * Update an existing staff profile.
   * @param {Object} packet - Staff profile data
   * @returns {Promise<ServiceResponse>}
   */
  static async updateStaffProfile({ packet, authentication }) {
    const { orgRef } = authentication;
    const role = await RoleRepo.getById(packet.roleRef, orgRef);
    if (!role) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Role" }));
    }

    const clinic = await ClinicRepo.findClinicById(packet.clinicRef, orgRef);
    if (!clinic) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Clinic" }));
    }

    const userUpdateEntity = AuthMapper.toUserUpdateEntity(packet);

    const updatedUser = await AuthRepo.updateUser(packet.userId, userUpdateEntity);
    if (!updatedUser) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }

    const staffProfileUpdateEntity = StaffMapper.toStaffProfileUpdateEntity(packet);

    const updatedProfile = await StaffProfileRepo.updateProfile(packet.staffId, staffProfileUpdateEntity);

    if (!updatedProfile) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.STAFF_PROFILE_NOT_FOUND);
    }
    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.STAFF_PROFILE_UPDATED, updatedProfile);
  }

  /**
   * Fetch all staff details for tabular view.
   * @returns {Promise<Array<Object>>}
   */
  static async fetchAllStaff({ authentication }) {
    const { orgRef } = authentication;

    const stafflist = await StaffProfileRepo.fetchAllStaff(orgRef);

    return new ServiceResponse(STATUS_CODES.OK, null, { stafflist });

  }

  /**
   * Fetch staff list (name and ID) by role name.
   * @param {string} roleName - Role name
   * @returns {Promise<ServiceResponse>}
   */
  static async fetchStaffListByRole({ roleName, authentication }) {
    const { orgRef } = authentication;
    const staffList = await AuthRepo.fetchUsersByRoleName(roleName, orgRef);
    return new ServiceResponse(STATUS_CODES.OK, null, staffList);

  }
}
