import { ICON_NAME } from "values/img-links";

export const DASHBOARD_CRUMB = {
    ROLES: {
        MANAGE: [
            {
                icon: "carbon:id-management",
                label: "Manage Roles",
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
                icon: "carbon:id-management",
                label: "Manage Staff",
            },
        ],
        ADD: [
            {
                icon: "fluent:people-team-20-regular",
                label: "Staff",
            },
            {
                label: "Staff Enrollment",
            },
        ],
        EDIT: [
            {
                icon: "fluent:people-team-20-regular",
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
        }
    }
}

export const ADMINSTRATOR_CRUMB = {
    MODULE: {
        INDEX: [
            {
                icon: "fluent:people-team-20-regular",
                label: "Manage Module",
            },
        ],
        CREATE: [
            {
                icon: "fluent:people-team-20-regular",
                label: "Manage Module",
            },
            {
                label: "Create",
            },
        ],
        UPDATE: [
            {
                icon: "fluent:people-team-20-regular",
                label: "Manage Module",
            },
            {
                label: "Update",
            },
        ]
    },
    WORKSPACE: {
        INDEX: [
            {
                icon: "fluent:people-team-20-regular",
                label: "Workspace",
            },
        ]
    }
}