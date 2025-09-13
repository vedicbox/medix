import { ICON_NAME } from "values/img-links";

// Common icons and labels
const COMMON = {
    DISEASE: { icon: ICON_NAME.DISEASE, label: "Manage Disease" },
    SPECS: { icon: ICON_NAME.SPECS, label: "Manage Spec" },
    ROLES: { icon: ICON_NAME.ROLE, label: "Manage Roles" },
    CLINIC: { icon: ICON_NAME.CLINIC, label: "Manage Clinic" },
    TEAMS: { icon: ICON_NAME.TEAMS, label: "Manage Staff" },
    PATIENTS: { icon: ICON_NAME.HEART_OUTLINE, label: "Patients" },
    MODULE: { icon: ICON_NAME.NAV_MODULE, label: "Manage Module" },
    ORG: { icon: ICON_NAME.ORG, label: "Manage Org" },
    ADD_TO_QUEUE: { icon: ICON_NAME.ADD_TO_QUEUE, label: "Add to Queue" },
    QUEUE: { icon: ICON_NAME.QUEUE, label: "Queue" },
};

// Helper functions
const createCrumb = (icon, label) => ({ icon, label });
const createLabelOnly = (label) => ({ label });

const createBreadcrumb = (baseConfig, ...actions) => [
    createCrumb(baseConfig.icon, baseConfig.label),
    ...actions.map(action => createLabelOnly(action))
];

const manageCrumb = (baseConfig, action = "") => {
    const actions = action ? action.split(",") : [];
    return createBreadcrumb(baseConfig, ...actions);
};

// Reusable breadcrumb configurations
const master = {
    disease: {
        index: manageCrumb(COMMON.DISEASE)
    },
    specs: {
        index: manageCrumb(COMMON.SPECS)
    },
    roles: {
        manage: manageCrumb(COMMON.ROLES)
    },
    clinic: {
        index: manageCrumb(COMMON.CLINIC),
        create: manageCrumb(COMMON.CLINIC, "Create"),
        update: manageCrumb(COMMON.CLINIC, "Update")
    }
};

const staff = {
    manage: manageCrumb(COMMON.TEAMS),
    create: manageCrumb(COMMON.TEAMS, "Create"),
    update: manageCrumb(COMMON.TEAMS, "Update"),
    meeting: manageCrumb(COMMON.TEAMS, "Meeting")
};

const patient = {
    create: manageCrumb(COMMON.PATIENTS, "Create"),

    update: manageCrumb(COMMON.PATIENTS, "Update"),
};

const module = {
    index: manageCrumb(COMMON.MODULE),
    create: manageCrumb(COMMON.MODULE, "Create"),
    update: manageCrumb(COMMON.MODULE, "Update")
};

const dashboard = {
    addToQueue: manageCrumb(COMMON.ADD_TO_QUEUE),
    queue: manageCrumb(COMMON.QUEUE),
}

const adminstrator = {
    org: {
        index: manageCrumb(COMMON.ORG),
        create: manageCrumb(COMMON.ORG, "Create"),
        permission: createBreadcrumb(COMMON.ORG, "Permission")
    }
};

// Export all crumbs in a single object
export const CRUMB_NAV = {
    module,
    staff,
    patient,
    master,
    dashboard,
    adminstrator
};

export default CRUMB_NAV;