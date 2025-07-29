class ModuleMapper {
  /**
   * Maps request data to module entity for DB
   * @param {Object} request - Incoming request data
   * @returns {Object} - Mapped module entity
   */
  static toModuleEntity(request) {
    return {
      name: request.name,
      desc: request.desc,
    };
  }

  /**
   * Formats DB module(s) for API output
   * @param {Array|Object} data - Module(s) from DB
   * @returns {Array|Object} - Formatted response
   */
  static toModuleResponse(data) {
    const format = (item) => ({
      id: item._id,
      name: item.name,
      desc: item.desc,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
    return Array.isArray(data) ? data.map(format) : format(data);
  }
}

export default ModuleMapper;
