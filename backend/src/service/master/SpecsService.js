import RoleMapper from "@mapper/RoleMapper.js";
import RoleRepo from "@repo/auth/RoleRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";
import SpecsDao from "../../models/master/SpecsDao.js";
import SpecsRepo from "../../repo/master/SpecsRepo.js";
import SpecsMapper from "../../mapper/SpecsMapper.js";

export default class SpecsService {
  static async getAll({ authentication }) {
    const { orgRef } = authentication;
    const payload = await SpecsRepo.getAll(orgRef);
    return new ServiceResponse(
      STATUS_CODES.OK,
      null,
      payload
    );
  }
 
  static async create({ authentication, packet }) {
    const { orgRef } = authentication;

    const exists = await SpecsRepo.isExists({ name: packet.name, orgRef });
    if (exists) {
      return new ServiceResponse(
        STATUS_CODES.CONFLICT,
        formatMsg(MESSAGES.ALREADY_EXISTS, { label: "Role" })
      );
    }

    const createObj = SpecsMapper.createSpecsMapper(packet);
    createObj.orgRef = orgRef;

    const newSpecs = await SpecsRepo.create(createObj);
    return new ServiceResponse(
      STATUS_CODES.OK,
      formatMsg(MESSAGES.CREATE, { label: "Specialization" }),
      newSpecs
    );
  }
   
  static async getNames({ authentication }) {
    const { orgRef } = authentication;
    const specs = await SpecsRepo.getNames(orgRef);
    return new ServiceResponse(
      STATUS_CODES.OK,
      null,
      specs
    );
  }

  static async update({ authentication, packet }) {
    const { orgRef } = authentication;

    const exists = await SpecsRepo.isExists({ _id: packet._id, orgRef });
    if (!exists) {
      return new ServiceResponse(
        STATUS_CODES.NOT_FOUND,
        formatMsg(MESSAGES.NOT_FOUND, { label: "Specialization" })
      );
    }

    const updateObj = SpecsMapper.createSpecsMapper(packet);
    await SpecsRepo.update(packet._id, updateObj);

    return new ServiceResponse(
      STATUS_CODES.OK,
      formatMsg(MESSAGES.UPDATE, { label: "Specialization" }),
      null
    );
  }

}