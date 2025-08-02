import ModuleMapper from "@mapper/adminstrator/ModuleMapper.js";
import ModuleRepo from "@repo/adminstrator/ModuleRepo.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

export default class ModuleService {
    static async createModule(request) {
        const moduleEntity = ModuleMapper.toModuleEntity(request);
        const created = await ModuleRepo.createModule(moduleEntity);
        return new ServiceResponse(STATUS_CODES.OK, "Module created successfully", ModuleMapper.toModuleResponse(created));
    }

    static async findAllModules() {
        const modules = await ModuleRepo.findAllModules();
        return new ServiceResponse(STATUS_CODES.OK, null, ModuleMapper.toModuleResponse(modules));
    }

    static async updateModule(moduleId, request) {
        const moduleEntity = ModuleMapper.toModuleEntity(request);
        const updated = await ModuleRepo.updateModule(moduleId, moduleEntity);
        if (!updated) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, "Module not found");
        }
        return new ServiceResponse(STATUS_CODES.OK, "Module updated successfully", ModuleMapper.toModuleResponse(updated));
    }
}
