import { Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import LinearIndeterminate from "components/loader/LinearIndeterminate";
import ImgReplacer from "components/placeholder/ImgReplacer";
import { EnhancedTableHead, StyledTableCell, StyledTableRow } from "../tableEl";

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
                      }}
                      align={headObj.align}
                      enableBorder={enableBorder}
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
