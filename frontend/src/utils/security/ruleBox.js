import {
    alphaRequired,
    emailRequired,
    numericRequired,
    optionalNumeric,
    required,
    requiredWithLength
} from './ruleGenerator';

// ========== Login Form ==========
export const LOGIN_RULES = {
    email: emailRequired("Email"),
    orgCode: required("Org Code"),
    password: requiredWithLength("Password", 6),
};

// ========== Staff Form ==========
export const STAFF_FORM_RULES = {
    firstName: alphaRequired("First Name"),
    lastName: alphaRequired("Last Name"),
    phone1: numericRequired("Phone No", 10),
    phone2: optionalNumeric("Alternate Number", 10),
    whatsappPref: numericRequired("Whatsapp No"),
    email: emailRequired("Email Address"),
    gender: required("Gender"),
    dob: required("DOB"),
    country: required("Country"),
    state: required("State"),
    city: required("City"),
    pincode: numericRequired("Pincode"),
    address: required("Address"),
};

// ========== Assign Entity ==========
export const ASSIGN_ENTITY_RULES = {
    roleRef: required("Role"),
    clinicRef: required("Clinic"),
};

// ========== Patient Form ==========
export const PATIENT_FORM_RULES = {
    firstName: alphaRequired("First Name"),
    lastName: alphaRequired("Last Name"),
    whatsappPref: numericRequired("Whatsapp No"),
    email: emailRequired("Email Address"),
    gender: required("Gender"),
    dob: required("DOB"),
    country: required("Country"),
    state: required("State"),
    city: required("City"),
    pincode: numericRequired("Pincode"),
    addr1: required("Address-1"),
    weight: numericRequired("Weight"),
    age: numericRequired("Age"),
    phone1: numericRequired("Phone No", 10),
    phone2: optionalNumeric("Alternate Number", 10),
    height: required("Height"),
    martial: required("Marital"),
};

// ========== Search Field ==========
export const SEARCH_FIELD_RULE = {
    phone: numericRequired("Phone No", 10),
};

// ========== Collect Fee ==========
export const COLLECT_FEE_RULE = {
    assignDoc: required("Assign Doctor"),
    transId: {
        required: true,
        props: {
            msgVariable: { label: "Transaction Id" },
            optional: true,
        },
    },
    payMode: required("Payment Mode"),
    fee: numericRequired("Consultation Fee"),
};

// ========== Roles Form ==========
export const ROLES_FORM_RULES = {
    name: alphaRequired("Role Name"),
    status: required("Status"),
};

// ========== Module Form ==========
export const MODULE_FORM_RULES = {
    name: alphaRequired("Name"),
    tag: required("Tag"),
    category: required("Category"),
};

// ========== Clinic Form ==========
export const CLINIC_FORM_RULES = {
    name: required("Clinic Name"),
    gstNo: required("Gst No"),
    shortDesc: alphaRequired("Short Description"),
    phone1: numericRequired("Phone No", 10),
    phone2: optionalNumeric("Alternate Number", 10),
    email: emailRequired("Email Address"),
    country: required("Country"),
    state: required("State"),
    city: required("City"),
    pincode: numericRequired("Pincode"),
    address: required("Address"),
    shiftFrom: required("Shift From"),
    shiftTo: required("Shift To"),
    weekOff: required("Week Off"),
};

// ========== Organization Form ==========
export const ORG_FORM_RULES = {
    name: required("Organization Name"),
    orgCode: required("OrgCode"),
    category: required("Category"),
    status: required("Status"),
};

// ========== Disease Form ==========
export const DISEASE_FORM_RULES = {
    name: alphaRequired("Name"),
    status: required("Status"),
};


// ========== Specs Form ==========
export const SPECS_FORM_RULES = {
    name: alphaRequired("Name"),
    status: required("Status"),
};
