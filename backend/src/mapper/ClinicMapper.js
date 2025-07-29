class ClinicMapper {

    static createClinicMapper(clinicData, orgCode) {
        return {
            ...clinicData,
            orgCode
        };
    }

    static updateClinicMapper(clinicData) {
        return {
            ...clinicData,
            status: clinicData.status ?? 1
        };
    }
}

export default ClinicMapper;