import { Chip, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LinearIndeterminate from "components/loader/LinearIndeterminate";
import ImgReplacer from "components/placeholder/ImgReplacer";

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "enableBorder",
})(({ theme, enableBorder, width }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary[400],
    color: "#fff",
    border: enableBorder ? "1px solid #ccc" : undefined,
    width,
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

function EnhancedTableHead({ headers, enableBorder }) {
  return (
    <TableHead>
      <TableRow>
        {headers.map((headCell) => (
          <StyledTableCell
            key={headCell.label}
            align={headCell.align ? headCell.align : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            enableBorder={enableBorder}
            width={headCell.width || "auto"}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ClassicTable(props) {
  const {
    headers,
    rows,
    actionContainer,
    size = "small",
    enableBorder = true,
    isFetching,
    placeholder,
  } = props;

  const cellReturnContent = (headObj, selectRow) => {
    // Remove the brackets and split the string into parts
    const path = headObj.picker?.split(".");
    const content = path?.reduce((obj, key) => obj && obj[key], selectRow);

    if (headObj.chip) {
      return (
        <Chip
          size="medium"
          variant="outlined"
          sx={{
            borderRadius: 2,
            bgcolor: headObj.chip?.[content],
            minWidth: 100,
          }}
          label={content}
        />
      );
    } else if (headObj.action) {
      return actionContainer(selectRow);
    } else {
      return content;
    }
  };

  // Placeholder configuration for no data
  const imgDetails = {
    src: placeholder.img,
    heading: placeholder.heading,
    minHeight: 100,
    dimension: 100,
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table stickyHeader size={size}>
          <EnhancedTableHead headers={headers} enableBorder={enableBorder} />
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell align="center">
                  <LinearIndeterminate />
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <StyledTableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {headers.map((headObj) => (
                    <StyledTableCell
                      key={headObj.label}
                      style={{
                        width: headObj.width || "auto",
                        border: enableBorder ? "1px solid #ccc" : undefined,
                      }}
                      align={headObj.align}
                    >
                      {cellReturnContent(headObj, row)}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  align="center"
                  className="pt-5"
                >
                  <ImgReplacer {...imgDetails} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
