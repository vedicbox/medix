import { Chip, FormControlLabel, Radio } from "@mui/material";
import { getBasicTbProperty } from "components/table/tableUtils/properties";
import { createMRTColumnHelper } from "material-react-table";


const columnHelper = createMRTColumnHelper();

export const ADMINSTRATOR_TBCOL = {
  module: () => ({
    key: "_id",
    isSubCol: true,
    isMenuAction: true,
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("_id", {
        header: "UUID",
      }),
      columnHelper.accessor("tag", {
        header: "Tag",
      }),
      columnHelper.accessor("name", {
        header: "Module Name",
      })
    ],
    subColObj: () => ({
      key: "uuid",
      title: "Sub Module",
      picker: "subModules",
      defaultProps: {
        ...getBasicTbProperty(),
      },
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
    })
  }),
  moduleCreate: () => ({
    key: "_id",
    isMenuAction: false,
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("tag", {
        header: "Tag",
      }),
      columnHelper.accessor("name", {
        header: "Module Name",
      }),
    ],
  }),

  modulePermission: (props) => ({
    key: "_id",
    isSubCol: true,
    isMenuAction: true,
    defaultProps: {
      ...getBasicTbProperty(),
      enableRowSelection: true,
      state: {
        rowSelection: props.selectedRows || {}
      },
      onRowSelectionChange: props.setSelectedRows,
      getRowId: (row) => row._id,
    },
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "Module Name",
      })
    ],
    subColObj: () => ({
      key: "uuid",
      title: "Sub Module",
      picker: "subModules",
      defaultProps: {
        ...getBasicTbProperty(),
        enableRowSelection: true,
        state: {
          rowSelection: props.selectedRows
        },
        onRowSelectionChange: props.setSelectedRows,
        getRowId: (row) => row.uuid,
      },
      columns: [
        columnHelper.accessor("name", {
          header: "SubModule Name",
        }),

      ]
    })
  }),
  org: () => ({
    key: "_id",
    isMenuAction: true,
    title: "Org List",
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "Org Name",
      }),
      columnHelper.accessor("orgCode", {
        header: "Code",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Date",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        Cell: ({ cell }) => getStatusContent(cell)
      }),
    ],

  })
}

export const DASHBOARD_TBCOL = {
  disease: (props) => ({
    key: "_id",
    title: "Disease List",
    isMenuAction: true,
    isSubCol: true,
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "name",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        Cell: ({ cell }) => getStatusContent(cell)
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Dt",
      })
    ],
    subColObj: () => ({
      key: "uuid",
      title: "Sub Disease",
      picker: "subDiseases",
      defaultProps: {
        ...getBasicTbProperty(),
      },
      columns: [
        columnHelper.accessor("uuid", {
          header: "UUID",
        }),
        columnHelper.accessor("name", {
          header: "Name",
        }),
        columnHelper.accessor("status", {
          header: "Status",
          Cell: ({ cell }) => getStatusContent(cell)
        }),
      ]
    })
  }),
  subdisease: (props) => ({
    key: "_id",
    title: "Sub Disease List",
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "Sub Disease",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        Cell: ({ cell }) => getStatusContent(cell)
      })
    ]
  }),
  specialization: (props) => ({
    key: "_id",
    title: "Specialization List",
    isMenuAction: true,
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "Specialization",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Dt",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        Cell: ({ cell }) => getStatusContent(cell)
      }),
    ]
  }),
  clinic: (props) => ({
    key: "_id",
    title: "Clinic List",
    isMenuAction: true,
    defaultProps: {
      ...getBasicTbProperty(),
    },
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
        Cell: ({ cell }) => getStatusContent(cell)
      }),
    ]
  }),
  staffMeeting: (props) => ({
    key: "_id",
    title: "Staff Meeting",
    isMenuAction: true,
    COLUMNS: [
      columnHelper.accessor("meetingFrom", {
        header: "Meeting From",
      }),
      columnHelper.accessor("meetingTo", {
        header: "Meeting To",
      }),
      columnHelper.accessor("dtFrom", {
        header: "Date From",
      }),
      columnHelper.accessor("dtTo", {
        header: "Date To",
      }),
      columnHelper.accessor("createdAt", {
        header: "Created Dt",
      }),
    ],

  }),
  staff: (props) => ({
    key: "_id",
    title: "Staff List",
    isMenuAction: true,
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("fullName", {
        header: "Full Name",
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
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("patientName", {
        header: "Patient Name",
      }),
      columnHelper.accessor("phone1", {
        header: "Phone No",
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
      columnHelper.accessor("createdAt", {
        header: "Appoint Dt",
      }),
    ],

  })
}


export const GLOBAL_TBCOL = {
  roles: (props) => ({
    key: "_id",
    title: "Role List",
    isMenuAction: false,
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "Role Name",
        Cell: ({ cell }) => getRoleCheckbox(props, cell)
      }),
      columnHelper.accessor("status", {
        header: "Status",
        Cell: ({ cell }) => getStatusContent(cell)
      }),
    ]
  }),
  adminRoles: (props) => ({
    key: "_id",
    title: "Role List",
    isMenuAction: false,
    defaultProps: {
      ...getBasicTbProperty(),
    },
    COLUMNS: [
      columnHelper.accessor("name", {
        header: "Org Name",
        Cell: ({ cell }) => getRoleCheckbox(props, cell)
      }),
      columnHelper.accessor("fullName", {
        header: "Admin",
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
    ]
  }),

}


function getStatusContent(cell) {
  return <Chip variant="outlined" size="small" label={cell.getValue() ? "Active" : "InActive"} color={cell.getValue() ? "success" : "error"} />
}

function getRoleCheckbox(props, cell) {
  const { _id, name, status, permission } = cell.row.original;
  return <FormControlLabel
    value={_id}
    control={<Radio size="small" />}
    label={name}
    checked={props.selectedRow === _id}
    onChange={() => props.onChange({ _id, permission })}
    disabled={status == 0}
  />
}