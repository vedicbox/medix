
class OrgMapper {

    static toOrgEntity(request) {
        const { category, name, orgCode, status } = request;
        return {
            category, name, orgCode, status
        };
    }

    static getAdminstratorOrg() {
        const {
            ADMINISTRATION_ORG: orgCode,
            ADMINISTRATION_FIRSTNAME: firstName,
            ADMINISTRATION_LASTNAME: lastName
        } = process.env;

        return {
            category: 1, name: firstName + " " + lastName, orgCode
        };
    }

}

export default OrgMapper;