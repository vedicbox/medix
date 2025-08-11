class ClinicMapper {
    static mapClinicFields(clinicData) {
        return {
            name: clinicData.name,
            gstNo: clinicData.gstNo,
            shortDesc: clinicData.shortDesc,
            email: clinicData.email,
            phone1: clinicData.phone1,
            phone2: clinicData.phone2,
            country: clinicData.country,
            state: clinicData.state,
            city: clinicData.city,
            pincode: clinicData.pincode,
            address: clinicData.address,
            weekOff: clinicData.weekOff,
            shiftFrom: clinicData.shiftFrom,
            shiftTo: clinicData.shiftTo,
            clinicId: clinicData.clinicId,

        };
    }

    static createClinicMapper(clinicData, orgRef) {
        return {
            ...this.mapClinicFields(clinicData),
            orgRef,
            status: clinicData.status ?? 1
        };
    }

    static updateClinicMapper(clinicData) {
        return {
            ...this.mapClinicFields(clinicData),
            status: clinicData.status ?? 1
        };
    }
}

export default ClinicMapper;