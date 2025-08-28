import { Box, IconButton, Typography } from "@mui/material";
import Iconify from "components/icons/Iconify";
import ClassicMenu from "components/menu/ClassicMenu";
import ImgReplacer from "components/placeholder/ImgReplacer";
import { memo } from "react";
import { ICON_NAME } from "values/img-links";

const borderStyle = "1px solid #ccc";

const tableBodyCellStyles = {
  border: borderStyle,
  fontWeight: "normal",
};

const tableHeadCellStyles = {
  border: borderStyle,
  bgcolor: (theme) => theme.palette.primary[50],
};

const EmptyState = memo(({ placeholder }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "300px",
      width: "100%",
      p: 4,
      backgroundColor: (theme) => theme.palette.background.paper,
    }}
  >
    <ImgReplacer {...placeholder} />
  </Box>
));

const TopToolbarTitle = memo(({ title }) => (
  <div className="my-auto d-flex align-items-center">
    <Iconify icon="fluent-color:table-48" />
    <Typography variant="body1" className="text-muted f-w-600 ml-2">
      {title}
    </Typography>
  </div>
));

const mainTableHeadCellStyles = {
  border: borderStyle,
  color: (theme) => theme.palette.background.default,
  bgcolor: (theme) => theme.palette.primary.main,
  "& .Mui-TableHeadCell-Content": {
    justifyContent: "space-between",
    color: (theme) => theme.palette.background.default + " !important",
  },
  "& .MuiTableSortLabel-icon": {
    color: (theme) => theme.palette.background.default + " !important",
  },
  "& .MuiIconButton-root": {
    color: (theme) => theme.palette.background.default + " !important",
  },
};

const RowActions = memo(({ row, actionList, isMenuAction }) =>
  isMenuAction ? (
    <ClassicMenu
      menulist={actionList(row.original)}
      menuProps={{
        sx: {
          "& .MuiMenuItem-root": {
            color: (theme) => theme.palette.primary.main,
          },
        },
      }}
    >
      <IconButton
        size="small"
        sx={{
          color: (theme) => theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Iconify icon={ICON_NAME.VERTICAL_MENU} />
      </IconButton>
    </ClassicMenu>
  ) : (
    actionList(row.original)
  )
);

export const getTableProperty = (props) => {
  const { rows, colObj, actionList, placeholder } = props;

  return {
    columns: colObj.COLUMNS,
    data: rows,
    enableRowActions: !!actionList,
    positionActionsColumn: "last",
    // enableExpanding: hasSubObj,
    enableExpandAll: false,
    enableDensityToggle: false,
    initialState: {
      density: "compact",
      columnPinning: {
        left: ["mrt-row-expand"],
        right: ["mrt-row-actions", "mrt-row-select"],
      },
    },
    muiTableHeadCellProps: { sx: mainTableHeadCellStyles },
    muiTableBodyCellProps: { sx: tableBodyCellStyles },
    muiRowActionsProps: {
      sx: {
        "& .MuiIconButton-root": {
          color: (theme) => theme.palette.primary.main,
        },
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        boxShadow: "none",
        background: "transparent",
        borderTop: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
        borderRadius: 2,
      },
    },
    renderRowActions: ({ row }) =>
      actionList && (
        <RowActions
          row={row}
          actionList={actionList}
          isMenuAction={colObj.isMenuAction}
        />
      ),
    renderTopToolbarCustomActions: () => (
      <TopToolbarTitle title={colObj.title} />
    ),

    renderEmptyRowsFallback: () =>
      placeholder ? <EmptyState placeholder={placeholder} /> : undefined,
    ...colObj.defaultProps,
  };
};

export const getSubTableProperty = ({ row, colObj }) => {
  const subColumns = colObj.columns || [];
  const subRows = row.original[colObj.picker] || [];

  return {
    columns: subColumns,
    data: subRows,
    enablePagination: false,
    enableSorting: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableDensityToggle: false,
    initialState: {
      density: "compact",
      columnPinning: {
        left: ["mrt-row-expand"],
        right: ["mrt-row-actions", "mrt-row-select"],
      },
    },
    getRowId: (row) => row[colObj.key],
    muiTableHeadCellProps: { sx: tableHeadCellStyles },
    muiTableBodyCellProps: { sx: tableBodyCellStyles },
    ...colObj.defaultProps,
  };
};

export const getBasicTbProperty = () => {
  return {
    enableColumnActions: false,
    enableSorting: false,
    enableTopToolbar: false,
    enablePagination: false,
  };
};
