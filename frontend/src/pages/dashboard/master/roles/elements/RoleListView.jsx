import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Iconify from "components/icons/Iconify";
import MuiBasicTable from "components/table/MuiBasicTable";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { ICON_NAME } from "values/img-links";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function RoleListView(props) {
  const navigate = useNavigate();

  const { handleRoleSelect, roleSelect, rolePayload } = props;

  const navigateEdit = (row) => {
    const navigateObj = {
      _id: row._id,
      name: row.name,
      status: Number(row.status),
    };
    navigate(PARAMS_ROUTE.EDIT, { state: navigateObj });
  };

  const actionBox = (row) => (
    <IconButton onClick={() => navigateEdit(row)}>
      <Iconify icon={ICON_NAME.EDIT} />
    </IconButton>
  );

  const colObj = {
    roleSelect,
    handleRoleSelect,
  };

  return (
    <>
      <MuiBasicTable
        rows={rolePayload}
        colObj={DASHBOARD_TBCOL.roles(colObj)}
        actionList={(row) => actionBox(row)}
      />
    </>
  );
}
