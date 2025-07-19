export const MASTER_PERMISSION = {
    ADMIN: "0"
}

export const ID_MAPPING = {
    dashboard: {
        uuid: "1"
    },
    patient: {
        uuid: "2",
        align: {
            uuid: "21"
        }
    },
    staff: {
        uuid: "3",
        management: {
            uuid: "31"
        }
    },
    master: {
        uuid: "4"
    }
}

export const PERMISSION_LIST = [
    {
        uuid: ID_MAPPING.dashboard.uuid,
        module: "Dashboard",
    },
    {
        uuid: ID_MAPPING.patient.uuid,
        module: "Patients",
        subModule: [
            {
                uuid: ID_MAPPING.patient.align.uuid,
                name: "Align"
            }
        ]
    },
    {
        uuid: ID_MAPPING.staff.uuid,
        module: "Staff",
        subModule: [
            {
                uuid: ID_MAPPING.staff.management.uuid,
                name: "Management"
            }
        ]
    },

]
