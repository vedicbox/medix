import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import ImgReplacer from "components/placeholder/ImgReplacer";
import { StyledTableCell, StyledTableRow } from "../tableEl";

export default function ClassicMobileView(props) {
  const {
    headers,
    rows,
    actionContainer,
    placeholder,
    size = "small",
    enableBorder = true,
  } = props;

  const cellReturnContent = (headObj, selectRow) => {
    // Remove the brackets and split the string into parts
    const path = headObj.picker?.split(".");
    const content = path?.reduce((obj, key) => obj && obj[key], selectRow);

    if (headObj.chip) {
      return (
        <Chip
          size="small"
          variant="outlined"
          sx={{
            borderRadius: 2,
            bgcolor: headObj.chip?.[content],
            minWidth: 100,
          }}
          label={content}
        />
      );
    }

    return content;
  };

  // Placeholder configuration for no data
  const imgDetails = {
    src: placeholder.img,
    heading: placeholder.heading,
    minHeight: 100,
    dimension: 100,
  };

  if (rows.length == 0)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImgReplacer {...imgDetails} />
      </Box>
    );

  return (
    <>
      {rows.map((row) => (
        <div key={row._id} className="mb-4">
          <Paper>
            <TableContainer component={Paper}>
              <Table stickyHeader size={size}>
                <TableBody>
                  {headers.map(
                    (headCell) =>
                      !headCell.action && (
                        <StyledTableRow key={headCell.label}>
                          <StyledTableCell
                            enableBorder={enableBorder}
                            sx={{
                              bgcolor: (theme) => theme.palette.primary.main,
                              color: "background.paper",
                            }}
                          >
                            {headCell.label}
                          </StyledTableCell>
                          <StyledTableCell enableBorder={enableBorder}>
                            {cellReturnContent(headCell, row)}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper className=" full-br elevation1">
            {actionContainer(row)}
          </Paper>
        </div>
      ))}
    </>
  );
}
