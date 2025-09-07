// Validation Messages
export const VALIDATION_MSG = {
  required: `{label} is required`,
  email: "Invalid email address.",
  domain: "Unauthorized username.",
  url: "Invalid URL.",
  img: "Invalid image file.",
  minlength: `{label} must be at least {count} characters`,  // This is for string
  maxlength: "{label} must be at most {count} characters.",  // This is for string
  length: `{label} must be {count} digit.`,
  minSize: "{label} is below the minimum value.", // This is for array
  maxSize: "{label} exceeds the maximum value.", // This is for array
  numeric: "{label} must be numeric.",
  duplicate: "{label} already exists.",
  alpha: "{label} must contain only letters.",
  alphaNumeric: "{label} must contain only letters and numbers.",
};


// Alert Messages
export const ALERT_MSG = {
  ACCEPT_TERM_AND_CONDITION: "Please accept our terms and conditions.",
  INVALID_SEARCH: `Please provide valid search parameters `,
  ROLE_SELECT: "Please select a role",
  SPECS_SELECT: "Please select a specialization",
};

// Helper Text Messages
export const HELPER_TXT_MSG = {
  defaultText: "",
  roleName: "Role Name must be unique and in Capital Letters"
};

export const PLACEHOLDER_MSG = {

  SEARCH_PATIENT: "Search Patient",
  EMPTY: "No {label} is available."
};
