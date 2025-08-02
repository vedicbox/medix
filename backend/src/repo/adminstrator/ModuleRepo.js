import ModuleDao from "@models/adminstrator/ModuleDao.js";

export default class ModuleRepo {
  static async createModule(moduleEntity) {
    const module = new ModuleDao(moduleEntity);
    return await module.save();
  }

  static async findAllModules() {
    return await ModuleDao.find({}).lean();
  }

  static async updateModule(moduleId, moduleEntity) {
    return await ModuleDao.findByIdAndUpdate(moduleId, moduleEntity, { new: true, runValidators: true }).lean();
  }
}
