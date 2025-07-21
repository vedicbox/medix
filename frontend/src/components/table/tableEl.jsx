import { TableCell, tableCellClasses, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

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
