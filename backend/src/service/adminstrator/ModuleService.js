import ModuleMapper from "@mapper/adminstrator/ModuleMapper.js";
import ModuleRepo from "@repo/adminstrator/ModuleRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

export default class ModuleService {
    /**
     * Create a new module
     */
    static async create({ packet }) {
        const moduleEntity = ModuleMapper.toModuleEntity(packet);
        await ModuleRepo.create(moduleEntity);
        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.CREATE, { label: "Module" }), null);
    }

    /**
     * Get all modules
     */
    static async getAll() {
        const modules = await ModuleRepo.getAll();
        return new ServiceResponse(STATUS_CODES.OK, null, ModuleMapper.toModuleResponse(modules));
    }

    /**
     * Update a module by ID
     */
    static async update({ packet }) {

        const exists = await ModuleRepo.isExists({ _id: packet._id });
        if (!exists) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Role", id }));
        }

        const moduleEntity = ModuleMapper.toModuleEntity(packet);
        await ModuleRepo.update(packet._id, moduleEntity);
        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.UPDATE, { label: "Module" }), null);

    }

    /**
     * Get modules as JSON
     */
    static async getJson() {
        try {
            const modules = await ModuleRepo.getAll();
            return new ServiceResponse(STATUS_CODES.OK, null, ModuleMapper.toModuleJson(modules));
        } catch (error) {
            throw new Error(MESSAGES.MODULE_JSON_FETCH_FAILED);
        }
    }
}