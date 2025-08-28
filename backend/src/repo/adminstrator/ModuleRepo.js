import ModuleDao from "@models/adminstrator/ModuleDao.js";

export default class ModuleRepo {
  /**
   * Create a new module
   */
  static async create(moduleEntity) {
    const module = new ModuleDao(moduleEntity);
    return await module.save();
  }

  /**
   * Get all modules
   */
  static async getAll() {
    return await ModuleDao.find({}).lean();
  }

  /**
   * Update module by ID
   */
  static async update(moduleId, moduleEntity) {
    return await ModuleDao.findByIdAndUpdate(
      moduleId,
      moduleEntity,
      { new: true, runValidators: true }
    ).lean();
  }

  static async isExists(query) {
    const finalQuery = { ...query };
    return ModuleDao.exists(finalQuery);
  }


}