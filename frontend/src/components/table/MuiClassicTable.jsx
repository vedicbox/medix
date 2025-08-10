import { Box, IconButton, Typography } from "@mui/material";
import Iconify from "components/icons/Iconify";
import ClassicMenu from "components/menu/ClassicMenu";
import ImgReplacer from "components/placeholder/ImgReplacer";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import PropTypes from "prop-types";
import { memo } from "react";
import { ICON_NAME } from "values/img-links";

// Shared style constants
const borderStyle = "1px solid #ccc";
const tableHeadCellStyles = {
  border: borderStyle,
  bgcolor: (theme) => theme.palette.primary[50],
};
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
const tableBodyCellStyles = {
  border: borderStyle,
  fontWeight: "normal",
};
const detailPanelStyles = {
  padding: 2,
  bgcolor: (theme) => theme.palette.background.paper,
};

const DetailPanel = memo(({ row, subColObj }) => {
  const subColumns = subColObj.columns || [];
  const subRows = row.original[subColObj.picker] || [];

  if (!subRows.length || !subColumns.length) return null;

  return (
    <Box sx={detailPanelStyles}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {subColObj.title}
      </Typography>
      <MaterialReactTable
        columns={subColumns}
        data={subRows}
        enablePagination={false}
        enableSorting={false}
        enableColumnActions={false}
        enableColumnFilters={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        enableDensityToggle={false}
        initialState={{ density: "compact" }}
        getRowId={(row) => row[subColObj.key]}
        muiTableHeadCellProps={{ sx: tableHeadCellStyles }}
        muiTableBodyCellProps={{ sx: tableBodyCellStyles }}
      />
    </Box>
  );
});

DetailPanel.propTypes = {
  row: PropTypes.object.isRequired,
  subColObj: PropTypes.object.isRequired,
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

RowActions.propTypes = {
  row: PropTypes.object.isRequired,
  actionList: PropTypes.func.isRequired,
};

const TopToolbarTitle = memo(({ title }) => (
  <div className="my-auto d-flex align-items-center">
    <Iconify icon="fluent-color:table-48" />
    <Typography variant="body1" className="text-muted f-w-600 ml-2">
      {title}
    </Typography>
  </div>
));

TopToolbarTitle.propTypes = {
  title: PropTypes.string.isRequired,
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

EmptyState.propTypes = {
  placeholder: PropTypes.object.isRequired,
};

const MuiClassicTable = (props) => {
  const { rows, colObj, actionList, placeholder, defaultProps } = props;
  const hasSubObj = !!colObj.SUBOBJ;

  const table = useMaterialReactTable({
    columns: colObj.COLUMNS,
    data: rows,
    enableRowActions: !!actionList,
    positionActionsColumn: "last",
    enableExpanding: hasSubObj,
    enableExpandAll: false,
    enableDensityToggle: false,
    initialState: { density: "compact" },
    getRowId: (row) => row._id,
    muiTableHeadCellProps: { sx: mainTableHeadCellStyles },
    muiTableBodyCellProps: { sx: tableBodyCellStyles },
    // White action menu and dropdown items
    muiRowActionsProps: {
      sx: {
        "& .MuiIconButton-root": {
          color: (theme) => theme.palette.primary.main,
        },
      },
    },
    // Remove elevation and paper effect
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
    renderDetailPanel: hasSubObj
      ? ({ row }) => <DetailPanel row={row} subColObj={colObj.SUBOBJ} />
      : undefined,
    renderEmptyRowsFallback: () =>
      placeholder ? <EmptyState placeholder={placeholder} /> : undefined,
    ...defaultProps,
  });

  return <MaterialReactTable table={table} />;
};

MuiClassicTable.propTypes = {
  rows: PropTypes.array.isRequired,
  colObj: PropTypes.shape({
    COLUMNS: PropTypes.array.isRequired,
    SUBOBJ: PropTypes.object,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(MuiClassicTable);
