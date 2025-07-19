import { FormControlLabel, IconButton, Paper, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Iconify from "components/icons/Iconify";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";

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
      status: row.status,
    };
    navigate(PARAMS_ROUTE.EDIT, { state: navigateObj });
  };

  return (
    <Paper variant="outlined">
      <TableContainer component={Paper}>
        <Table aria-label="customized table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Role Name</StyledTableCell>
              <StyledTableCell padding="checkbox"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolePayload.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left">
                  <FormControlLabel
                    value={row._id}
                    control={<Radio size="small" />}
                    label={row.name}
                    checked={roleSelect === row._id}
                    onChange={handleRoleSelect}
                    disabled={row.status == 0}
                  />
                </StyledTableCell>
                <StyledTableCell padding="checkbox">
                  <IconButton onClick={() => navigateEdit(row)}>
                    <Iconify icon="tabler:edit" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
