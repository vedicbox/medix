import { Chip, styled, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Iconify from "components/icons/Iconify";
import LinearIndeterminate from "components/loader/LinearIndeterminate";
import ClassicMenu from "components/menu/ClassicMenu";
import ImgReplacer from "components/placeholder/ImgReplacer";
import * as React from "react";
import { useCallback } from "react";
import { isDataArray } from "utils/parse";
import { ICON_NAME } from "values/img-links";
import { EnhancedTableHead, StyledTableCell } from "../tableEl";

const ParentTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ChildTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

// Helper Components
const ExpandIcon = ({ open }) => (
  <Iconify icon={open ? ICON_NAME.ANGLE_DOWN : ICON_NAME.ANGLE_RIGHT} />
);

// Memoized SubRow Component
const SubRow = React.memo(({ row }) => {
  const theme = useTheme();

  return (
    <ChildTableRow>
      <StyledTableCell>
        <IconButton aria-label="expand row" size="small">
          <Iconify icon={ICON_NAME.ARROW_RIGHT} />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ paddingLeft: theme.spacing(4) }}>
        {row.name}
      </StyledTableCell>
      <StyledTableCell align="center" padding="checkbox"></StyledTableCell>
    </ChildTableRow>
  );
});

const SubContainer = ({ headers, rows }) => {
  return Object.values(headers).map((header) => {
    console.log(header);
  });
};

function Row(props) {
  const { row, headers, cellReturnContent } = props;
  const [open, setOpen] = React.useState(false);

  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <React.Fragment>
      <ParentTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {headers.MAIN.map((headObj) =>
          headObj.icon ? (
            <StyledTableCell key={headObj.icon} enableBorder={true}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={
                  isDataArray(row.subModules).length > 0
                    ? handleToggle
                    : undefined
                }
              >
                {isDataArray(row.subModules).length > 0 ? (
                  <ExpandIcon open={open} />
                ) : (
                  <Iconify icon={ICON_NAME.ARROW_RIGHT} />
                )}
              </IconButton>
            </StyledTableCell>
          ) : (
            <StyledTableCell
              key={headObj.label}
              style={{
                width: headObj.width || "auto",
              }}
              align={headObj.align}
              enableBorder={true}
            >
              {cellReturnContent(headObj, row)}
            </StyledTableCell>
          )
        )}
      </ParentTableRow>

      {/* <SubContainer headers={headers.SUB} rows={row} /> */}
    </React.Fragment>
  );
}

export default function ClassicInnerTable(props) {
  const {
    headers,
    rows,
    actionList,
    size = "small",
    enableBorder = true,
    isFetching,
    placeholder,
    keyPicker = "id",
  } = props;

  const renderActionBox = (row) =>
    actionList && (
      <ClassicMenu menulist={actionList(row)}>
        <IconButton size="small">
          <Iconify icon={ICON_NAME.VERTICAL_MENU} />
        </IconButton>
      </ClassicMenu>
    );

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
      return renderActionBox(selectRow);
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
    <TableContainer component={Paper}>
      <Table stickyHeader size={size}>
        <EnhancedTableHead headers={headers.MAIN} enableBorder={enableBorder} />
        <TableBody>
          {isFetching ? (
            <TableRow>
              <TableCell align="center">
                <LinearIndeterminate />
              </TableCell>
            </TableRow>
          ) : rows.length > 0 ? (
            rows.map((row) => (
              <Row
                key={row[keyPicker]}
                row={row}
                headers={headers}
                cellReturnContent={cellReturnContent}
              />
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.MAIN.length}
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
  );
}
