import { formatMsg } from "utils/security/validation";

export const getReplacerUri = (route, id) => formatMsg(route, { $id: id });

export const ROUTE_PARAMS = {
    index: "/",
    wildcard: "*",
    create: "create",
    update: "update",
    master: "master",
    board: "board",
    permission: "permission",
    search: "search"
};

export const ROUTE_SEG = {
    auth: {
        login: "/login"
    },
    dashboard: {
        index: "/*",
        addToQueue: {
            route: "/add-to-queue/*",
            nav: "/add-to-queue",
        },
        queue: {
            route: "/queue/*",
            nav: "/queue",
        },
        create: "/add-new/patient",
    },
    staff: {
        manage: "/staff/manage",
        create: "/staff/manage/create",
        update: "/staff/manage/update",
        board: {
            route: "/staff/manage/board/*",
            nav: "/staff/manage/board",
        },
    },
    patient: {
        index: "patient/:caseId/*",
        update: "/patient/$id/update",
        consult: "/patient/consult",
    },
    master: {
        disease: {
            route: "/master/disease/*",
            nav: "/master/disease",
        },
        spec: {
            route: "/master/disease/specialization/*",
            nav: "/master/disease/specialization",
        },
        roles: "/master/roles",
        clinic: {
            index: "/master/clinic",
            create: "/master/clinic/create",
            update: "/master/clinic/update",
        },
    },
    org: {
        index: "/org",
        create: "/org/create",
        update: "/org/update",
        permission: "/org/permission",
    },
    module: {
        index: "/module",
        create: "/module/create",
        update: "/module/update",
    },
    admin: {
        index: "/administrator/*",
        overview: "/administrator",
        org: "/administrator-overview",
    },
};

export default ROUTE_SEG;