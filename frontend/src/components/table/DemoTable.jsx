import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor("name.firstName", {
    header: "First Name",
  }),
  columnHelper.accessor("name.lastName", {
    header: "Last Name",
  }),
  columnHelper.accessor("address", {
    header: "Company",
  }),
  columnHelper.accessor("city", {
    header: "City",
  }),
  columnHelper.accessor("state", {
    header: "Country",
  }),
];

const Example = ({ data }) => {
  const table = useMaterialReactTable({
    columns,
    data,
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid #ccc",
        color: (theme) => theme.palette.background.default,
        bgcolor: (theme) => theme.palette.primary.main,
        "& .Mui-TableHeadCell-Content": {
          justifyContent: "space-between",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid #ccc",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
