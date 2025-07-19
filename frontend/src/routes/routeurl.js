export const PARAMS_ROUTE = {
  INDEX: "/",
  WILD_CARD: "*",
  HOLDER: ":holder",
  CREATE: "create",
  EDIT: "edit",
  SEARCH: "search",
  PATIENT: "patient",
  MOVE: "move",
  ENROLL: "enroll"
};

export const AUTH_ROUTE = {
  LOGIN: "/login",
  TERM_AND_CONDITION: "/terms-and-conditions",
};

export const DASHBOARD_ROUTE = {
  INDEX: "/",
  STAFF: {
    ENROLL: "staff/enrollment",
    MANAGE: "staff/manage",
  },
  PATIENT: {
    ALIGN: "patients/align",
    ENROLL: "patients/enrollment",
  },
  FINANCE: {
    BOARD: "finance/board"
  },
  MASTER: {
    ROLES: "master/roles"
  }
};


export const PATIENT_ROUTE = {
  CONSULT: "consult",

};