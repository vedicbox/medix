import OrgMapper from "../../src/mapper/adminstrator/OrgMapper.js";
import AuthMapper from "../../src/mapper/AuthMapper.js";
import RoleMapper from "../../src/mapper/RoleMapper.js";
import OrgRepo from "../../src/repo/adminstrator/OrgRepo.js";
import AuthRepo from "../../src/repo/auth/AuthRepo.js";
import RoleRepo from "../../src/repo/auth/RoleRepo.js";


class AdminFactory {
    static async init() {
        try {
            const orgCode = process.env.ADMINISTRATION_ORG;
            let orgRes = await OrgRepo.findOrgByFields({ orgCode });

            if (!orgRes) {
                orgRes = await this.createOrganization();

                const roleRes = await this.createRole(orgRes._id);
                await this.createUser(orgRes._id, roleRes._id);
                
                console.log("Default factory initialization completed.");
            }


        } catch (error) {
            console.error("Initialization failed:", error);
            process.exit(1);
        }
    }

    static async createOrganization() {
        const orgObj = OrgMapper.getAdminstratorOrg();
        await OrgRepo.create(orgObj);
    }

    static async createRole(orgRef) {
        const roleObj = RoleMapper.getAdminstratorRole(orgRef);
        return await RoleRepo.createRole(roleObj);
    }

    static async createUser(orgRef, roleRef) {
        const roleObj = AuthMapper.getAdminstratorUser(orgRef, roleRef);
        return await AuthRepo.createUser(roleObj);
    }

}

export default AdminFactory;