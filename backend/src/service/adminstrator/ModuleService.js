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

    static async updateModule(request) {
        // First, get the existing module to access current subModules
        const existingModule = await ModuleRepo.findModuleById(request._id);
        if (!existingModule) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, "Module not found");
        }

        // Pass existing subModules to the mapper for UUID handling
        const moduleEntity = ModuleMapper.toModuleEntity(request, existingModule.subModules);
        const updated = await ModuleRepo.updateModule(request._id, moduleEntity);
        
        return new ServiceResponse(STATUS_CODES.OK, "Module updated successfully", ModuleMapper.toModuleResponse(updated));
    }
}
