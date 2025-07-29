import { generateRecept } from "../generator/recept/index.js";

class PublicFilesService {
    
  static async consultRecept(data) {
    try {
      // Pass data to generator if needed
      return await generateRecept(data);
    } catch (error) {
      throw new Error(error.message || "Failed to generate recept");
    }
  }
}

export default PublicFilesService;
