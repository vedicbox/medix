import RoleDao from "../src/models/auth/RoleDao.js";
import UserDao from "../src/models/auth/UserDao.js";

class DefaultFactory {
    static async init() {
        try {
            await this.ensureAdministrationRole();
            await this.ensureAdministrationUser();
            console.log("Default factory initialization completed");
        } catch (error) {
            console.error("Initialization failed:", error);
            process.exit(1);
        }
    }

    static async ensureAdministrationRole() {
        const roleName = "ADMINISTRATION";
        const existingRole = await RoleDao.findOne({ name: roleName });

        if (!existingRole) {
            const administrationRole = new RoleDao({
                name: roleName,
                status: 3,
                permission: [0]
            });
            await administrationRole.save();
            console.log("Administration role created");
            return administrationRole;
        }
        return existingRole;
    }

    static async ensureAdministrationUser() {
        const administrationEmail = process.env.ADMINISTRATION_EMAIL;
        const administrationPassword = process.env.ADMINISTRATION_PASSWORD;
        const administrationFirstName = process.env.ADMINISTRATION_FIRSTNAME;
        const administrationLastName = process.env.ADMINISTRATION_LASTNAME;
        const administrationOrg = process.env.ADMINISTRATION_ORG;

        // Get administration role
        const administrationRole = await RoleDao.findOne({ name: "ADMINISTRATION" });
        if (!administrationRole) {
            throw new Error("Administration role not found. Please ensure roles are initialized.");
        }

        const existingAdministrationUser = await UserDao.findOne({ email: administrationEmail });
        if (!existingAdministrationUser) {
            const administrationUser = new UserDao({
                email: administrationEmail,
                password: administrationPassword,
                firstName: administrationFirstName,
                lastName: administrationLastName,
                orgCode: administrationOrg,
                isActive: true,
                roleRef: administrationRole._id
            });

            await administrationUser.save();
            console.log("Administration user created:", administrationEmail);
        } else {
            // Update existing administration user if needed
            if (!existingAdministrationUser.roleRef || !existingAdministrationUser.isActive) {
                existingAdministrationUser.roleRef = administrationRole._id;
                existingAdministrationUser.isActive = true;
                await existingAdministrationUser.save();
                console.log("Administration user updated:", administrationEmail);
            } else {
                console.log("Administration user already exists:", administrationEmail);
            }
        }
    }
}

export default DefaultFactory;