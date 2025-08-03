export const LOGIN_RULES = {
    email: {
        required: true,
        email: true,
        props: {
            msgVariable: { label: "Email" },
        }
    },
    orgCode: {
        required: true,
        props: {
            msgVariable: { label: "Org Code " },
        }
    },
    password: {
        required: true,
        minlength: 6,
        props: {
            msgVariable: {
                label: "Password", count: 6
            },
        }

    },
};

export const STAFF_FORM_RULES = {
    roleRef: {
        required: true,
        props: {
            msgVariable: { label: "Role" },
        }
    },
    clinicRef: {
        required: true,
        props: {
            msgVariable: { label: "Clinic" },
        }
    },
    firstName: {
        required: true,
        alpha: true,
        props: {
            msgVariable: { label: "First Name" },
        }
    },
    lastName: {
        required: true,
        alpha: true,
        props: {
            msgVariable: { label: "Last Name" },
        }
    },
    phone1: {
        required: true,
        numeric: true,
        length: 10,
        props: {
            msgVariable: { label: "Phone No", count: 10 },

        }
    },
    phone2: {
        numeric: true,
        length: 10,
        props: {
            msgVariable: { label: "Alternate Number", count: 10 },
            optional: true
        }

    },
    whatsappPref: {
        required: true,
        numeric: true,
        props: {
            msgVariable: { label: "Whatsapp No" },
        }

    },
    email: {
        required: true,
        email: true,
        props: {
            msgVariable: { label: "Email Address" },
        }

    },
    gender: {
        required: true,
        props: {
            msgVariable: { label: "Gender" },
        }
    },
    dob: {
        required: true,
        props: {
            msgVariable: { label: "DOB" },
        }
    },
    country: {
        required: true,
        props: {
            msgVariable: { label: "Country" },
        }
    },
    state: {
        required: true,
        props: {
            msgVariable: { label: "State" },
        }

    },
    city: {
        required: true,
        props: {
            msgVariable: { label: "City" },
        }

    },
    pincode: {
        required: true,
        numeric: true,
        props: {
            msgVariable: { label: "Pincode" },
        }

    },
    address: {
        required: true,
        props: {
            msgVariable: { label: "Address" },
        }
    },
    

}


export const PATIENT_FORM_RULES = {
    firstName: {
        required: true,
        alpha: true,
        props: {
            msgVariable: { label: "First Name" },
        }
    },
    lastName: {
        required: true,
        alpha: true,
        props: {
            msgVariable: { label: "Last Name" },
        }
    },
    whatsappPref: {
        required: true,
        numeric: true,
        props: {
            msgVariable: { label: "Whatsapp No" },
        }
    },
    email: {
        required: true,
        email: true,
        props: {
            msgVariable: { label: "Email Address" },
        }
    },
    gender: {
        required: true,
        props: {
            msgVariable: { label: "Gender" },
        }
    },
    dob: {
        required: true,
        props: {
            msgVariable: { label: "DOB" },
        }
    },
    country: {
        required: true,
        props: {
            msgVariable: { label: "Country" },
        }
    },
    state: {
        required: true,
        props: {
            msgVariable: { label: "State" },
        }
    },
    city: {
        required: true,
        props: {
            msgVariable: { label: "City" },
        }
    },
    pincode: {
        required: true,
        numeric: true,
        props: {
            msgVariable: { label: "Pincode" },
        }
    },
    addr1: {
        required: true,
        props: {
            msgVariable: { label: "Address-1" },
        }
    },
    weight: {
        required: true,
        numeric: true,
        props: {
            msgVariable: { label: "Weight" },
        }
    },
    age: {
        required: true,
        numeric: true,
        props: {
            msgVariable: { label: "Age" },
        }
    },
    phone1: {
        required: true,
        numeric: true,
        length: 10,
        props: {
            msgVariable: { label: "Phone No", count: 10 },
        }
    },
    phone2: {
        numeric: true,
        length: 10,
        props: {
            msgVariable: { label: "Alternate Number", count: 10 },
            optional: true
        }
    },
    feet: {
        required: true,
        props: {
            msgVariable: { label: "Height" },
        }
    },
    martial: {
        required: true,
        props: {
            msgVariable: { label: "Marital" },
        }
    },
};

export const SEARCH_FIELD_RULE = {
    phone: {
        required: true,
        numeric: true,
        length: 10,
        props: {
            msgVariable: { label: "Phone No" },
        }

    }
}

export const COLLECT_FEE_RULE = {
    assignDoc: {
        required: true,
        props: {
            msgVariable: { label: "Assign Doctor" },
        }
    },
    transId: {
        required: true,
        props: {
            msgVariable: { label: "Transaction Id" },
            optional: true
        }
    },
    payMode: {
        required: true,
        props: {
            msgVariable: { label: "Payment Mode" },
        }
    },
    fee: {
        required: true,
        numeric: true,
        props: {
            msgVariable: { label: "Consultation Fee" },
        }
    },
}

export const ROLES_FORM_RULES = {
    name: {
        required: true,
        alpha: true,
        props: {
            msgVariable: { label: "Role Name" },
        }
    },
    status: {
        required: true,
        props: {
            msgVariable: { label: "Status" },
        }
    },

};

export const MODULE_FORM_RULES = {
    name: {
        required: true,
        alpha: true,
        props: {
            msgVariable: { label: "Name" },
        }
    },
    desc: {
        required: true,
        alpha: true,
        props: {
            msgVariable: { label: "Description" },
        }
    },
};



export const CLINIC_FORM_RULES = {
    name: {
        required: true,
        props: {
            msgVariable: { label: "Clinic Name" },
        }
    },
    gstNo: {
        required: true,
        props: {
            msgVariable: { label: "Gst No" },
        }
    },
    shortDesc: {
        required: true,
        alpha: true,
        props: {
            msgVariable: { label: "Short Description" },
        }
    },
    phone1: {
        required: true,
        numeric: true,
        length: 10,
        props: {
            msgVariable: { label: "Phone No", count: 10 },

        }
    },
    phone2: {
        numeric: true,
        length: 10,
        props: {
            msgVariable: { label: "Alternate Number", count: 10 },
            optional: true
        }

    },
    email: {
        required: true,
        email: true,
        props: {
            msgVariable: { label: "Email Address" },
        }

    },
    country: {
        required: true,
        props: {
            msgVariable: { label: "Country" },
        }
    },
    state: {
        required: true,
        props: {
            msgVariable: { label: "State" },
        }

    },
    city: {
        required: true,
        props: {
            msgVariable: { label: "City" },
        }

    },
    pincode: {
        required: true,
        numeric: true,
        props: {
            msgVariable: { label: "Pincode" },
        }

    },
    address: {
        required: true,
        props: {
            msgVariable: { label: "Address" },
        }
    },
    shiftFrom: {
        required: true,
        props: {
            msgVariable: { label: "Shift From" },
        }
    },
    shiftTo: {
        required: true,
        props: {
            msgVariable: { label: "Shift To" },
        }
    },
    weekOff: {
        required: true,
        props: {
            msgVariable: { label: "Week Off" },
        }
    },
}