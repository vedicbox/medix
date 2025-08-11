import OrgMapper from "@mapper/adminstrator/OrgMapper.js";
import AuthMapper from "@mapper/AuthMapper.js";
import StaffMapper from "@mapper/StaffMapper.js";
import OrgRepo from "@repo/adminstrator/OrgRepo.js";
import AuthRepo from "@repo/auth/AuthRepo.js";
import RoleRepo from "@repo/auth/RoleRepo.js";
import StaffProfileRepo from "@repo/StaffRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";
import { AUTH_ENUM } from "../../enum/authEnum.js";

/**
 * Service for role management operations.
 * Handles creation, update, and permission management for roles.
 */
export default class OrgService {

    static async create(req) {
        const orgEntity = OrgMapper.toOrgEntity(req.org);
        const orgRes = await OrgRepo.create(orgEntity);

        const roleObj = {
            name: AUTH_ENUM.ROLES.ADMIN,
            orgRef: orgRes._id
        }

        await RoleRepo.createRole(roleObj);

        const userObj = AuthMapper.toUserEntity(req.staff, orgRes._id);
        const userRes = await AuthRepo.createUser(userObj);

        const staffObj = StaffMapper.toStaffProfileEntity(req.staff, userRes._id);
        await StaffProfileRepo.createProfile(staffObj);

        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.CREATE, { label: "Organization" }), null);
    }

    static async findAll() {
        const orgRes = await OrgRepo.findAll();
        console.log("orgRes",orgRes)
        return new ServiceResponse(STATUS_CODES.OK, null, orgRes);
    }

}
