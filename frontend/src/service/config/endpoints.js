import { env } from "env";

const BASE_URL = env.BACKEND_ENDPOINT;

const LOC_POINT = {
  ROLES: "roles",
  STAFF: "staff",
  PATIENT: "patient",
  CLINIC: "clinic",
  PAYMENT: "api/payment",
  APPOINT: "appoint",
};

/**
 * Authentication Api
 */

export const AUTH_ENDPOINT = {
  AUTH_CHECK: `${BASE_URL}/auth/validate`,
  AUTHENTICATE: `${BASE_URL}/auth/login`,
};

export const STAFF_ENDPOINT = {
  CREATE: `${BASE_URL}/${LOC_POINT.STAFF}/profile/create`,
  UPDATE: `${BASE_URL}/${LOC_POINT.STAFF}/profile/update`,
  EDIT: `${BASE_URL}/${LOC_POINT.STAFF}/profile/edit`,
  FETCH_TABLIST: `${BASE_URL}/${LOC_POINT.STAFF}/fetch-tablist`,
  STAFF_LIST_VIA_ROLE: `${BASE_URL}/${LOC_POINT.STAFF}/list-via-role`,
};

export const ROLE_ENDPOINT = {
  CREATE_ROLE: `${BASE_URL}/${LOC_POINT.ROLES}/create`,
  UPDATE_ROLE: `${BASE_URL}/${LOC_POINT.ROLES}/update`,
  UPDATE_PERMISSIONS: `${BASE_URL}/${LOC_POINT.ROLES}/update/permissions`,
  FETCH_ROLE_NAMES: `${BASE_URL}/${LOC_POINT.ROLES}/fetch/roleNames`,
  FETCH_TB_LIST: `${BASE_URL}/${LOC_POINT.ROLES}/fetch-tablist`,
};

export const PATIENT_ENDPOINT = {
  SEARCH: `${BASE_URL}/${LOC_POINT.PATIENT}/search`,
  ENROLL_PT: `${BASE_URL}/${LOC_POINT.PATIENT}/create`,
  UPDATE_PT: `${BASE_URL}/${LOC_POINT.PATIENT}/update`,
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
  FETCH_TABLIST: `${BASE_URL}/${LOC_POINT.CLINIC}/fetch-tablist`,
};