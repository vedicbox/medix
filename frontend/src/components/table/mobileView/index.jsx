import {
  Box,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import Iconify from "components/icons/Iconify";
import ImgReplacer from "components/placeholder/ImgReplacer";
import { ICON_NAME } from "values/img-links";
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
        <div key={row._id}>
          <Paper>
            <TableContainer component={Paper}>
              <Table stickyHeader size={size}>
                <TableBody>
                  {headers.map(
                    (headCell, index) =>
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
          <Paper className="mt-1 full-br">
            {actionContainer(row)}
          </Paper>
        </div>
      ))}
    </>
  );

  return (
    <Grid container spacing={2}>
      {rows.map((row) => (
        <Grid key={row._id} size={{ xs: 12, lg: 6 }} className="mt-2">
          <Paper className="p-2 py-4 full-br" elevation={4}>
            {headers.map(
              (headCell, index) =>
                !headCell.action && (
                  <Paper
                    key={headCell.label}
                    size={{ xs: 12, ...headCell.dimension }}
                    className="p-2 mb-1"
                    // elevation={3}
                    variant="outlined"
                  >
                    <div className="d-flex align-items-center ">
                      <span className="mr-2">
                        <Iconify icon={ICON_NAME.ANGLE_RIGHT} />
                      </span>
                      <Typography noWrap className="f-s-15 f-w-600">
                        {headCell.label} :-
                      </Typography>
                      <Typography noWrap className="ml-3 f-s-14">
                        {cellReturnContent(headCell, row)}
                      </Typography>
                    </div>
                  </Paper>
                )
            )}
          </Paper>
          <Paper className="p-2 full-br" elevation={4}>
            {actionContainer(row)}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
