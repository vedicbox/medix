import { yellow } from "@mui/material/colors";

export const DASHBOARD_HEADER = {
  STAFF: {
    MANAGE: [
      {
        label: "First Name",
        picker: "userRef.firstName",
      },
      {
        label: "Last Name",
        picker: "userRef.lastName",
      },
      {
        label: "Email",
        picker: "userRef.email",
      },
      {
        label: "Phone No",
        picker: "phone1",
      },
      {
        label: "Gender",
        picker: "gender",
      },
      {
        label: "Role",
        picker: "userRef.roleRef.name",
      },
      {
        label: "Created Dt",
        picker: "createdAt",
      },
      {
        label: "Action",
        action: true,
        cellProps: {
          align: "right",
        },
      },
    ],
  },
  PATIENTS: {
    ALIGN: [
      {
        label: "Patient Name",
        picker: "patientName",
      },
      {
        label: "Phone No",
        picker: "phone1",
      },
      {
        label: "Doctor Name",
        picker: "doctorName",
      },
      {
        label: "Status",
        picker: "status",
        align: "center",
        width: 100,
        chip: {
          "Pending": yellow[100]
        }
      },
      {
        label: "Fee",
        picker: "fee",
      },
      {
        label: "Pay Mode",
        picker: "payTag",
      },
      {
        label: "Action",
        action: true,
        cellProps: {
          align: "right",
        },
      },
    ]
  },
  MASTER: {
    CLINIC: [
      {
        label: "ClinicName",
        picker: "name",
      },
      {
        label: "Email",
        picker: "email",
      },
      {
        label: "Phone No",
        picker: "phone1",
      },
      {
        label: "GST No",
        picker: "gstNo",
      },
      {
        label: "Created Dt",
        picker: "createdAt",
      },
      {
        label: "Status",
        picker: "status",
      },
      {
        label: "Action",
        action: true,
        cellProps: {
          align: "right",
        },
      },
    ],
    ROLES: [
      {
        label: "Role Id",
        picker: "_id",
      },
      {
        label: "Role Name",
        picker: "name",
      },
      {
        label: "Status",
        picker: "isActive",
        chip: true,
      },
      {
        label: "Created Date",
        picker: "createdAt",
      },
      {
        label: "Action",
        action: true,
        cellProps: {
          align: "right",
        },
      },
    ],
  }
};
