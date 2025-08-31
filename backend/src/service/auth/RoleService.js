import RoleMapper from "@mapper/RoleMapper.js";
import RoleRepo from "@repo/auth/RoleRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

export default class RoleService {
  static async getAll({ authentication }) {
    const { orgRef } = authentication;
    const payload = await RoleRepo.getAll(orgRef);
    return new ServiceResponse(
      STATUS_CODES.OK,
      null,
      payload
    );
  }


  static async getNames({ authentication }) {
    const { orgRef } = authentication;
    const roles = await RoleRepo.getNames(orgRef);
    return new ServiceResponse(
      STATUS_CODES.OK,
      null,
      roles
    );
  }

  static async getAdminList({ authentication }) {
    const { orgRef } = authentication;
    const availableRoles = await RoleRepo.getAdminList(orgRef);
    return new ServiceResponse(
      STATUS_CODES.OK,
      null,
      { rolelist: availableRoles }
    );
  }

  static async create({ authentication, packet }) {
    const { orgRef } = authentication;

    const exists = await RoleRepo.isExists({ name: packet.name, orgRef });
    if (exists) {
      return new ServiceResponse(
        STATUS_CODES.CONFLICT,
        formatMsg(MESSAGES.ALREADY_EXISTS, { label: "Role" })
      );
    }

    const createObj = RoleMapper.createRoleMapper(packet);
    createObj.orgRef = orgRef;

    const newRole = await RoleRepo.create(createObj);
    return new ServiceResponse(
      STATUS_CODES.OK,
      formatMsg(MESSAGES.CREATE, { label: "Role" }),
      newRole
    );
  }

  static async update({ authentication, packet }) {
    const { orgRef } = authentication;

    const exists = await RoleRepo.isExists({ _id: packet._id, orgRef });
    if (!exists) {
      return new ServiceResponse(
        STATUS_CODES.NOT_FOUND,
        formatMsg(MESSAGES.NOT_FOUND, { label: "Role" })
      );
    }

    const updateObj = RoleMapper.createRoleMapper(packet);
    await RoleRepo.update(packet._id, updateObj);

    return new ServiceResponse(
      STATUS_CODES.OK,
      formatMsg(MESSAGES.UPDATE, { label: "Role" }),
      null
    );
  }

  static async updatePermissions({ authentication, packet }) {
    const { orgRef, permission, role } = authentication;

    const exists = await RoleRepo.isExists({ _id: packet.roleId });
    if (!exists) {
      return new ServiceResponse(
        STATUS_CODES.NOT_FOUND,
        formatMsg(MESSAGES.NOT_FOUND, { label: "Role" })
      );
    }

    const updateObj = RoleMapper.updatePermissionMapper(packet, permission, role == "ADMINISTRATION");

    await RoleRepo.update(packet.roleId, updateObj);
    return new ServiceResponse(
      STATUS_CODES.OK,
      formatMsg(MESSAGES.UPDATE, { label: "Role permissions" }),
      null
    );
  }
}