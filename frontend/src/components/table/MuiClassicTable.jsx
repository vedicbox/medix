import { Box, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { forwardRef, memo, useImperativeHandle } from "react";
import { getSubTableProperty, getTableProperty } from "./tableUtils/properties";

// Shared style constants

const detailPanelStyles = {
  padding: 2,
  bgcolor: (theme) => theme.palette.background.paper,
};

const DetailPanel = memo(({ row, colObj }) => {
  const tableProps = {
    ...getSubTableProperty({ row, colObj }),
  };
  const table = useMaterialReactTable(tableProps);

  return (
    <Box sx={detailPanelStyles}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {colObj.title}
      </Typography>
      <MaterialReactTable table={table} />
    </Box>
  );
});

const MuiClassicTable = forwardRef((props, ref) => {
  const { colObj } = props;
  const hasSubObj = !!colObj.isSubCol;

  const tableProps = {
    ...getTableProperty(props),
    renderDetailPanel: hasSubObj
      ? ({ row }) => {
          // Get the sub-table data from the row
          const subTableData = row.original?.[colObj?.subColObj()?.picker];

          // Only render detail panel if sub-table data exists and has items
          if (!subTableData || subTableData.length === 0) {
            return null;
          }

          return <DetailPanel row={row} colObj={colObj?.subColObj()} />;
        }
      : undefined,
  };

  const table = useMaterialReactTable(tableProps);

  useImperativeHandle(ref, () => ({
    getTableInstance: () => table,
  }));

  return <MaterialReactTable table={table} />;
});

export default memo(MuiClassicTable);
