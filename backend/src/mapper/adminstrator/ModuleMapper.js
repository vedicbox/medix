import { defaultDateFormatter } from "@utils/parse.js";
import { generateUUID, isValidUUID } from "@utils/uuid.js";

class ModuleMapper {

  static toModuleEntity(request, existingSubModules = []) {
    // Process subModules to add UUIDs for new items
    const processedSubModules = request.subModules?.map(subModule => {
      // If subModule already has a UUID, keep it (existing item)
      if (subModule.uuid && isValidUUID(subModule.uuid)) {
        return subModule;
      }

      // Check if this subModule exists in the database by name
      const existingSubModule = existingSubModules.find(
        existing => existing.name === subModule.name
      );

      // If it exists in DB, use the existing UUID
      if (existingSubModule) {
        return {
          ...subModule,
          uuid: existingSubModule.uuid
        };
      }

      // Generate new UUID for new subModule
      return {
        ...subModule,
        uuid: generateUUID(),
      };
    }) || [];

    return {
      name: request.name,
      subModules: processedSubModules,
      tag: request.tag,
      category: request.category
    };
  }

  /**
   * Formats DB module(s) for API output
   * @param {Array|Object} data - Module(s) from DB
   * @returns {Array|Object} - Formatted response
   */
  static toModuleResponse(data) {
    const format = (item) => ({
      _id: item._id,
      name: item.name,
      category: item.category,
      tag: item.tag,
      createdAt: defaultDateFormatter(item.createdAt),
      subModules: item.subModules,
    });
    return Array.isArray(data) ? data.map(format) : format(data);
  }
}

export default ModuleMapper;
