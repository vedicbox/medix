
class OrgMapper {

    static toOrgEntity(request) {
        const { category, orgName, orgCode, status } = request;
        return {
            category, orgName, orgCode, status
        };
    }

    static getAdminstratorOrg() {
        const {
            ADMINISTRATION_ORG: orgCode,
            ADMINISTRATION_FIRSTNAME: firstName,
            ADMINISTRATION_LASTNAME: lastName
        } = process.env;

        return {
            category: 1, orgName: firstName + " " + lastName, orgCode
        };
    }

}

export default OrgMapper;