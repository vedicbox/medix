import { Chip, FormControlLabel, Radio } from "@mui/material";
import { createMRTColumnHelper } from "material-react-table";
import { ICON_NAME } from "values/img-links";


const columnHelper = createMRTColumnHelper();

export const DASHBOARD_HEADER = {

  PATIENTS: {

  },
  MASTER: {

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


export const ADMINSTRATOR_HEADER = {
  MODULE: {
    MAIN: [
      {
        icon: ICON_NAME.ADD_NEW,
      },
      {
        label: "Module Id",
        picker: "_id",
      },
      {
        label: "Module Name",
        picker: "name",
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
    SUB: {
      title: "Sub Modules"
    }
  },
  CREATE_MODULE: {
    MAIN: [
      {
        label: "Name",
        picker: "name",
      },
      {
        label: "Action",
        action: true,
        width: 50,
        cellProps: {
          align: "right",
        },
      },
    ]
  },


}

export const ADMINSTRATOR_TBCOL = {
  MODULE: {
    key: "_id",
    COLUMNS: [
      columnHelper.accessor("_id", {
        header: "UUID",
      }),
      columnHelper.accessor("tag", {
        header: "Tag",
      }),
      columnHelper.accessor("name", {
        header: "Module Name",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Date",
      }),
    ],
    SUBOBJ: {
      key: "uuid",
      title: "Sub Module",
      picker: "subModules",
      columns: [
        columnHelper.accessor("uuid", {
          header: "UUID",
        }),
        columnHelper.accessor("tag", {
          header: "Tag",
        }),
        columnHelper.accessor("name", {
          header: "Name",
        }),
      ]
    }
  },
  workspace: () => ({
    key: "_id",
    isMenuAction: true,
    title: "Workspace List",
    COLUMNS: [
      columnHelper.accessor("orgCode", {
        header: "OrgCode",
      }),
      columnHelper.accessor("orgName", {
        header: "Module Name",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Date",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        Cell: ({ cell }) => <Chip variant="outlined" size="small" label={cell.getValue() ? "Active" : "InActive"} color={cell.getValue() ? "success" : "danger"} />
      }),
    ],

  })
}


export const WORKSPACE_TBCOL = [
  columnHelper.accessor("org", {
    header: "Organization",
  }),
  columnHelper.accessor("name", {
    header: "Client Name",
  }),
  columnHelper.accessor("phone1", {
    header: "Phone No",
  }),
  columnHelper.accessor("gstNo", {
    header: "GST No",
  }),
  columnHelper.accessor("createDt", {
    header: "Create Dt",
  }),
  columnHelper.accessor("expiryDt", {
    header: "Expiry Dt",
  }),
];

export const DASHBOARD_TBCOL = {
  roles: (props) => ({
    key: "_id",
    title: "Workspace List",
    isMenuAction: false,
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "Role Name",
        Cell: ({ cell }) => {
          const { _id, name, status } = cell.row.original
          return <FormControlLabel
            value={_id}
            control={<Radio size="small" />}
            label={name}
            checked={props.roleSelect === _id}
            onChange={props.handleRoleSelect}
            disabled={status == 0}
          />
        }
      })
    ]
  }),
  clinic: (props) => ({
    key: "_id",
    title: "Clinic List",
    isMenuAction: true,
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "Clinic Name",
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("phone1", {
        header: "Phone No",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Dt",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        Cell: ({ cell }) => <Chip variant="outlined" size="small" label={cell.getValue() ? "Active" : "InActive"} color={cell.getValue() ? "success" : "danger"} />
      }),
    ]
  }),
  staff: (props) => ({
    key: "_id",
    title: "Staff List",
    isMenuAction: true,
    COLUMNS: [
      columnHelper.accessor("userRef.firstName", {
        header: "First Name",
      }),
      columnHelper.accessor("userRef.lastName", {
        header: "Last Name",
      }),
      columnHelper.accessor("userRef.email", {
        header: "Email",
      }),
      columnHelper.accessor("phone1", {
        header: "Phone No",
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
      }),
      columnHelper.accessor("userRef.roleRef.name", {
        header: "Role",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Dt",
      }),
    ],

  }),
  alignPatient: (props) => ({
    key: "_id",
    title: "Patient List",
    isMenuAction: true,
    COLUMNS: [
      columnHelper.accessor("patientName", {
        header: "Patient Name",
      }),
      columnHelper.accessor("Phone No", {
        header: "phone1",
      }),
      columnHelper.accessor("doctorName", {
        header: "Doctor Name",
      }),
      columnHelper.accessor("status", {
        header: "Status",
      }),
      columnHelper.accessor("fee", {
        header: "Fee",
      }),
      columnHelper.accessor("payTag", {
        header: "Pay Mode",
      }),
    ],

  })
}