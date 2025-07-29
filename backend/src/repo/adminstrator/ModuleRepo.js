import ModuleDao from "../../models/adminstrator/ModuleDao.js";

export default class ModuleRepo {
  static async createModule(moduleEntity) {
    const module = new ModuleDao(moduleEntity);
    return await module.save();
  }

  static async findAllModules() {
    return await ModuleDao.find({}).lean();
  }
}
