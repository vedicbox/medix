import { ID_MAPPING } from "./ID_Config"

export const ACCESS_TAG = {
    ADMIN: "0",
    PUBLIC: "1"
}

export const DASH_TAG = {
    DASHBOARD: "dash",
    PATIENT: "patient",
    ALIGN_PT: "align_pt",
    MASTER: "master",
    STAFF: "staff",
    STAFF_MANAGE: "staff_mng",
}


export const ID_TAG = {
    DASHBOARD: "dash",
    PATIENT: "patient",
    ALIGN_PT: "align_pt",
    MASTER: "master",
    STAFF: "staff",
    STAFF_MANAGE: "staff_mng",
}

export const UUID = {
    public: ACCESS_TAG.PUBLIC,
    dashboard: ID_MAPPING[ID_TAG.DASHBOARD].uuid,
}