import OrgMapper from "@mapper/adminstrator/OrgMapper.js";
import AuthMapper from "@mapper/AuthMapper.js";
import StaffMapper from "@mapper/StaffMapper.js";
import OrgRepo from "@repo/adminstrator/OrgRepo.js";
import AuthRepo from "@repo/auth/AuthRepo.js";
import RoleRepo from "@repo/auth/RoleRepo.js";
import StaffProfileRepo from "@repo/staff/StaffRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";
import { AUTH_ENUM } from "../../enum/authEnum.js";

export default class OrgService {
    /**
     * Create a new organization
     */
    static async create({ packet }) {
        const { staff: staffPayload, org } = packet;

        const orgEntity = OrgMapper.toOrgEntity(org);
        const orgRes = await OrgRepo.create(orgEntity);

        const roleObj = {
            name: AUTH_ENUM.ROLES.ADMIN,
            type: 2,
            orgRef: orgRes._id
        };

        const roleRes = await RoleRepo.create(roleObj);
        staffPayload.roleRef = roleRes._id;

        const userObj = AuthMapper.toUserEntity(staffPayload, orgRes._id);
        const userRes = await AuthRepo.createUser(userObj);

        const staffObj = StaffMapper.toStaffProfileEntity(staffPayload, userRes._id);
        await StaffProfileRepo.createProfile(staffObj);

        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.CREATE, { label: "Organization" }), null);

    }

    /**
     * Get all organizations
     */
    static async getAll() {
        const orgRes = await OrgRepo.getAll();
        return new ServiceResponse(STATUS_CODES.OK, null, orgRes);
    }

    /**
     * Update organization details
     */
    static async update({ packet }) {
        const orgObj = OrgMapper.toOrgEntity(packet);
        const updatedOrg = await OrgRepo.update(packet.orgId, orgObj);
        if (!updatedOrg) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Organization details" }));
        }
        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.UPDATE, { label: "Organization details" }), null);
    }

    /**
     * Update admin details for organization
     */
    static async updateAdmin({ packet }) {
        const userObj = AuthMapper.toUserUpdateEntity(packet);
        const userRes = await AuthRepo.updateUser(packet.userId, userObj);

        if (!userRes) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Admin details" }));
        }

        const staffObj = StaffMapper.toStaffProfileUpdateEntity(packet);
        const updatedStaff = await StaffProfileRepo.updateProfile(packet._id, staffObj);

        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.UPDATE, { label: "Admin details" }), null);

    }

    /**
     * Get organization data for editing
     */
    static async getEditData({ id }) {
        const orgDetails = await OrgRepo.getById(id);
        if (!orgDetails) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Organization" }));
        }
        return new ServiceResponse(STATUS_CODES.OK, null, orgDetails);
    }

    /**
     * Get admin data for editing
     */
    static async getAdminEditData({ id }) {

        const adminDetails = await StaffProfileRepo.findAdminByOrgId(id);
        if (!adminDetails) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Admin details" }));
        }
        return new ServiceResponse(STATUS_CODES.OK, null, adminDetails);

    }
}