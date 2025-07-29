import ModuleMapper from "../../mapper/adminstrator/ModuleMapper.js";
import ModuleRepo from "../../repo/adminstrator/ModuleRepo.js";
import { ServiceResponse } from "../../utils/responseHandler.js";
import STATUS_CODES from "../../utils/statusCodes.js";

export default class ModuleService {
    static async createModule(request) {
        const moduleEntity = ModuleMapper.toModuleEntity(request);
        const created = await ModuleRepo.createModule(moduleEntity);
        return new ServiceResponse(STATUS_CODES.CREATED, "Module created successfully", ModuleMapper.toModuleResponse(created));
    }

    static async findAllModules() {
        const modules = await ModuleRepo.findAllModules();
        return new ServiceResponse(STATUS_CODES.OK, null, ModuleMapper.toModuleResponse(modules));
    }
}
