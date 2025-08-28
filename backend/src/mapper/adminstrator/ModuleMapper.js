import { isDataArray } from "@utils/parse.js";
import { generateUUID, isValidUUID } from "@utils/uuid.js";

class ModuleMapper {

  static toModuleEntity(request) {
    const processedSubModules = isDataArray(request.subModules)?.map(subModule => {

      if (!(subModule.uuid && isValidUUID(subModule.uuid))) {
        subModule["uuid"] = generateUUID()
      }

      return subModule
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
      createdAt: item.createdAt,
      subModules: item.subModules,
    });
    return Array.isArray(data) ? data.map(format) : format(data);
  }

  static toModuleJson(data) {
    const payloadData = Object.create(null);

    for (let i = 0; i < data.length; i++) {
      const { _id: uuid, name, tag, subModules } = data[i];
      payloadData[tag] = { uuid, name, tag };

      for (let j = 0; j < subModules.length; j++) {
        const { uuid: subUuid, name: subName, tag: subTag } = subModules[j];
        payloadData[subTag] = { uuid: subUuid, name: subName, tag: subTag };
      }
    }

    return payloadData;
  }

}

export default ModuleMapper;
