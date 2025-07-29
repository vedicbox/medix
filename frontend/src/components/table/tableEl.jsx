import {
  IconButton,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "components/icons/Iconify";
import { NavLink } from "react-router-dom";

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "enableBorder",
})(({ theme, enableBorder = true, width }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary[400],
    color: "#fff",
    border: enableBorder ? "1px solid #ccc" : undefined,
    width,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  border: enableBorder ? "1px solid #ccc !important" : undefined,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const EnhancedTableHead = ({ headers, enableBorder }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((headCell) =>
          headCell.icon ? (
            <StyledTableCell  padding="checkbox" >
              <IconButton component={NavLink} to={headCell.link} >
                <Iconify icon={headCell.icon} color="background.paper" />
              </IconButton>
            </StyledTableCell>
          ) : (
            <StyledTableCell
              key={headCell.label}
              align={headCell.align ? headCell.align : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              enableBorder={enableBorder}
              width={headCell.width || "auto"}
            >
              {headCell.label}
            </StyledTableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};
