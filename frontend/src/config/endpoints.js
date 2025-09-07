import { env } from "env";

const BASE_URL = env.BACKEND_ENDPOINT;

const LOC_POINT = {
  ROLES: "roles",
  SPECS: "specs",
  STAFF: "staff",
  PATIENT: "patient",
  CLINIC: "clinic",
  PAYMENT: "api/payment",
  APPOINT: "appoint",
  MODULE: "module",
  DISEASE: "disease",
  ORG: "org"
};

/**
 * Authentication Api
 */

export const AUTH_ENDPOINT = {
  AUTH_CHECK: `${BASE_URL}/auth/validate`,
  AUTHENTICATE: `${BASE_URL}/auth/login`,
};

export const STAFF_ENDPOINT = {
  CREATE: `${BASE_URL}/${LOC_POINT.STAFF}/create`,
  EDIT: `${BASE_URL}/${LOC_POINT.STAFF}/edit`,
  UPDATE: `${BASE_URL}/${LOC_POINT.STAFF}/update`,
  PROFILES: `${BASE_URL}/${LOC_POINT.STAFF}/fetch-all`,
  BY_ROLE: `${BASE_URL}/${LOC_POINT.STAFF}/by-role`,
};


export const ROLE_ENDPOINT = {
  // GET endpoints
  GET_ALL: `${BASE_URL}/${LOC_POINT.ROLES}/fetch-all`,
  GET_NAMES: `${BASE_URL}/${LOC_POINT.ROLES}/names`,
  GET_ADMIN_LIST: `${BASE_URL}/${LOC_POINT.ROLES}/admin-list`,
  
  // POST endpoints
  CREATE: `${BASE_URL}/${LOC_POINT.ROLES}/create`,
  UPDATE: `${BASE_URL}/${LOC_POINT.ROLES}/update`,
  UPDATE_PERMISSIONS: `${BASE_URL}/${LOC_POINT.ROLES}/update-permissions`,
};

export const SPECS_ENDPOINT = {
  // GET endpoints
  GET_ALL: `${BASE_URL}/${LOC_POINT.SPECS}/fetch-all`,
  GET_NAMES: `${BASE_URL}/${LOC_POINT.SPECS}/names`,
  
  // POST endpoints
  CREATE: `${BASE_URL}/${LOC_POINT.SPECS}/create`,
  UPDATE: `${BASE_URL}/${LOC_POINT.SPECS}/update`,
}

export const PATIENT_ENDPOINT = {
  SEARCH: `${BASE_URL}/${LOC_POINT.PATIENT}/search`,
  ENROLL_PT: `${BASE_URL}/${LOC_POINT.PATIENT}/create`,
  UPDATE_PT: `${BASE_URL}/${LOC_POINT.PATIENT}/update`,
  EDIT: `${BASE_URL}/${LOC_POINT.PATIENT}/edit`,
  VALIDATE: `${BASE_URL}/${LOC_POINT.PATIENT}/validate`,
  INITIATE_CONSULT: `${BASE_URL}/${LOC_POINT.PATIENT}/initiate-consult`,
  ALIGN_PATIENT_LIST: `${BASE_URL}/${LOC_POINT.PATIENT}/align-list`,
  CHANGE_ALIGN_STATUS: `${BASE_URL}/${LOC_POINT.PATIENT}/change-status`,
};


export const FILE_PUBLISH_ENDPOINT = {
  GENERATE_CONSULT_RECEPT: `${BASE_URL}/${LOC_POINT.PUBLISH}/generate-recept`,
};

export const CLINIC_ENDPOINT = {
  CREATE: `${BASE_URL}/${LOC_POINT.CLINIC}/create`,
  UPDATE: `${BASE_URL}/${LOC_POINT.CLINIC}/update`,
  EDIT: `${BASE_URL}/${LOC_POINT.CLINIC}/edit`,
  FIND_ALL: `${BASE_URL}/${LOC_POINT.CLINIC}/fetch-all`,
  FETCH_CLINIC_LIST: `${BASE_URL}/${LOC_POINT.CLINIC}/names`,
};

export const MODULE_ENDPOINT = {
  CREATE: `${BASE_URL}/${LOC_POINT.MODULE}/create`,
  UPDATE: `${BASE_URL}/${LOC_POINT.MODULE}/update`,
  FIND_ALL: `${BASE_URL}/${LOC_POINT.MODULE}/fetch-all`,
}

export const DISEASE_ENDPOINT = {
  CREATE: `${BASE_URL}/${LOC_POINT.DISEASE}/create`,
  UPDATE: `${BASE_URL}/${LOC_POINT.DISEASE}/update`,
  FIND_ALL: `${BASE_URL}/${LOC_POINT.DISEASE}/fetch-all`,
}

export const ORG_ENDPOINT = {
  CREATE: `${BASE_URL}/${LOC_POINT.ORG}/create`,
  FIND_ALL: `${BASE_URL}/${LOC_POINT.ORG}/fetch-all`,
  UPDATE_ORG_DETAILS: `${BASE_URL}/${LOC_POINT.ORG}/update`,
  UPDATE_ADMIN_DETAILS: `${BASE_URL}/${LOC_POINT.ORG}/admin/update`,
  EDIT_ORG: `${BASE_URL}/${LOC_POINT.ORG}/edit`,
  EDIT_ADMIN: `${BASE_URL}/${LOC_POINT.ORG}/admin/edit`,
};