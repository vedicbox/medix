
import AdminFactory from "./factoryUtils/adminFactor.js";

class DefaultFactory {
    static async init() {
        try {
            AdminFactory.init();
            console.log("Default factory initialization completed");
        } catch (error) {
            console.error("Initialization failed:", error);
            process.exit(1);
        }
    }

}

export default DefaultFactory;