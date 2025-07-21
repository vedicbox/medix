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
    }
}