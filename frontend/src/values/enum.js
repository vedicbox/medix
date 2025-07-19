import { AVATAR_IMG } from "./img-links";

export const HTTP_STATUS_CODES = {
  // Success
  OK: 200,

  // Redirection
  TEMPORARY_REDIRECT: 307,

  // Client Error
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,

  // Server Error
  INTERNAL_SERVER_ERROR: 500,

  BAD_REQUEST: 400,
};

export const SEVERITY_ENUM = {
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};

export const ROUTE_MODE_ENUM = {
  AUTH: "AUTH",
};

export const APP_BAR_ENUM = {
  GLOBAL: "GLOBAL",
  HIDE: "HIDE",
};

export const GENDER_PARSER = {
  M: {
    value: "Male",
    src: AVATAR_IMG.MALE,
  },
  F: {
    value: "Female",
    src: AVATAR_IMG.FEMALE,
  },
  O: {
    value: "Other",
    src: AVATAR_IMG.OTHER,
  },
};


export const PATENT_JOURNEY = {
  "COMPLETE": 1
}