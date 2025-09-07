import { ICON_NAME } from "values/img-links";

export const DASHBOARD_CRUMB = {
    ROLES: {
        MANAGE: [
            {
                icon: ICON_NAME.ROLE,
                label: "Manage Roles",
            },
        ],
    },
    SPECIALIZATION: {
        MANAGE: [
            {
                icon: ICON_NAME.SPECIALIZATION,
                label: "Manage Specialization",
            },
        ],
    },
     DISEASE: {
        MANAGE: [
            {
                icon: ICON_NAME.DISEASE,
                label: "Manage Disease",
            },
        ],
    },
    PATIENTS: {
        ALIGN: [
            {
                icon: ICON_NAME.WAITLIST,
                label: "Align Patients",
            },
        ],
        ENROLL: [
            {
                icon: ICON_NAME.HEART_OUTLINE,
                label: "Patients",
            },
            {
                label: "Patient Enrollment",
            },
        ],
        UPDATE: [
            {
                icon: ICON_NAME.UPDATE,
                label: "Update Patient",
            },
        ],
    },
    STAFF: {
        MANAGE: [
            {
                icon: ICON_NAME.TEAMS,
                label: "Manage Staff",
            },
        ],
        ADD: [
            {
                icon: ICON_NAME.TEAMS,
                label: "Staff",
            },
            {
                label: "Staff Enrollment",
            },
        ],
        EDIT: [
            {
                icon: ICON_NAME.TEAMS,
                label: "Staff",
            },
            {
                label: "Update Staff",
            },
        ]
    },
    MASTER: {
        CLINIC: {
            INDEX: [
                {
                    icon: ICON_NAME.CLINIC,
                    label: "Clinic",
                },
            ],
            CREATE: [
                {
                    icon: ICON_NAME.CLINIC,
                    label: "Clinic",
                },
                {
                    label: "Create",
                },
            ],
            UPDATE: [
                {
                    icon: ICON_NAME.CLINIC,
                    label: "Clinic",
                },
                {
                    label: "Update",
                },
            ]
        },
        DISEASE: {
            INDEX: [
                {
                    icon: ICON_NAME.DISEASE,
                    label: "Disease",
                },
            ],
            CREATE: [
                {
                    icon: ICON_NAME.DISEASE,
                    label: "Disease",
                },
                {
                    label: "Create",
                },
            ],
            UPDATE: [
                {
                    icon: ICON_NAME.DISEASE,
                    label: "Disease",
                },
                {
                    label: "Update",
                },
            ]
        }
    }
}

export const ADMINSTRATOR_CRUMB = {
    MODULE: {
        INDEX: [
            {
                icon: ICON_NAME.NAV_MODULE,
                label: "Manage Module",
            },
        ],
        CREATE: [
            {
                icon: ICON_NAME.NAV_MODULE,
                label: "Manage Module",
            },
            {
                label: "Create",
            },
        ],
        UPDATE: [
            {
                icon: ICON_NAME.NAV_MODULE,
                label: "Manage Module",
            },
            {
                label: "Update",
            },
        ]
    },
    ORG: {
        INDEX: [
            {
                icon: ICON_NAME.ORG,
                label: "Org",
            },
        ],
        PERMISSION: [
            {
                icon: ICON_NAME.ORG,
                label: "Org",
            },
            {
                label: "Permission",
            },
        ]
    }
}