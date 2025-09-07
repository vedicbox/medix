import { isDataArray } from "@utils/parse.js";
import { generateUUID, isValidUUID } from "@utils/uuid.js";

class DiseaseMapper {

  static toDiseaseEntity(request) {
    const processedSubDiseases = isDataArray(request.subDiseases)?.map(subDisease => {

      if (!(subDisease.uuid && isValidUUID(subDisease.uuid))) {
        subDisease["uuid"] = generateUUID()
      }

      return subDisease
    }) || [];

    return {
      name: request.name,
      subDiseases: processedSubDiseases,
      status: request.status
    };
  }

  /**
   * Formats DB module(s) for API output
   * @param {Array|Object} data - Module(s) from DB
   * @returns {Array|Object} - Formatted response
   */
  static toDiseaseResponse(data) {
    const format = (item) => ({
      _id: item._id,
      name: item.name,
      status: item.status,
      createdAt: item.createdAt,
      subDiseases: item.subDiseases,
    });
    return Array.isArray(data) ? data.map(format) : format(data);
  }

  static toDiseaseJson(data) {
    const payloadData = Object.create(null);

    for (let i = 0; i < data.length; i++) {
      const { _id: uuid, name, status, subDiseases } = data[i];
      payloadData[tag] = { uuid, name, status };

      for (let j = 0; j < subDiseases.length; j++) {
        const { uuid: subUuid, name: subName, status: subStatus } = subDiseases[j];
        payloadData[subTag] = { uuid: subUuid, name: subName, status: subStatus };
      }
    }

    return payloadData;
  }

}

export default DiseaseMapper;
