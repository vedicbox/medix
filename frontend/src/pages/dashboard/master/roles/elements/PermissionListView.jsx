import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import Iconify from "components/icons/Iconify";
import { memo, useCallback, useState } from "react";
import { PERMISSION_LIST } from "service/config/permissionlist";

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "inherit",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  border: "1px solid #ccc",
}));

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
  <Iconify icon={open ? "pepicons-print:angle-down" : "pepicons-print:angle-right"} />
);

// Memoized SubRow Component
const SubRow = memo(({ row, togglePermission, hasPermission }) => {
  const theme = useTheme();

  return (
    <ChildTableRow>
      <StyledTableCell>
        <IconButton
          aria-label="expand row"
          size="small"
        >
          <Iconify icon="pepicons-print:arrow-right" />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ paddingLeft: theme.spacing(4) }}>
        {row.name}
      </StyledTableCell>
      <StyledTableCell align="center" padding="checkbox">
        <Checkbox
          color="primary"
          checked={hasPermission}
          onChange={(e) => togglePermission(row.uuid, e.target.checked)}
        />
      </StyledTableCell>
    </ChildTableRow>
  );
});

// Memoized Row Component
const Row = memo(({ row, togglePermission, permissions }) => {
  const [open, setOpen] = useState(false);
  const hasPermission = permissions.includes(row.uuid);
  const subModules = row.subModule || [];

  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);

  const handleCheck = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      // Create a list of all IDs to update (parent + children)
      const idsToUpdate = [row.uuid, ...subModules.map((item) => item.uuid)];
      // Batch update permissions
      idsToUpdate.forEach((id) => togglePermission(id, isChecked));
    },
    [row.uuid, subModules, togglePermission]
  );

  return (
    <>
      <ParentTableRow>
        <StyledTableCell>

          <IconButton
            onClick={subModules.length > 0 ? handleToggle : undefined}
            aria-label="expand row"
            size="small"
          >
            {subModules.length > 0 ? <ExpandIcon open={open} /> : <Iconify icon="pepicons-print:arrow-right" />}
          </IconButton>

        </StyledTableCell>
        <StyledTableCell align="left">
          <Typography>{row.module}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" padding="checkbox">
          <Checkbox
            color="primary"
            checked={hasPermission}
            onChange={handleCheck}
          />
        </StyledTableCell>
      </ParentTableRow>

      {subModules.length > 0 && (
        <TableRow>
          <StyledTableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="sub-permissions">
                  <TableHead
                    sx={{ background: (theme) => theme.palette.primary.light }}
                  >
                    <TableRow>
                      <StyledTableCell padding="checkbox" />
                      <StyledTableCell />
                      <StyledTableCell padding="checkbox" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subModules.map((subRow) => (
                      <SubRow
                        key={subRow.uuid}
                        row={subRow}
                        togglePermission={togglePermission}
                        hasPermission={permissions.includes(subRow.uuid)}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </StyledTableCell>
        </TableRow>
      )}
    </>
  );
});

// Main Component
const PermissionListView = ({ roleObj, setRoleObj }) => {
  const permissions = roleObj?.permissions || [];

  const togglePermission = useCallback(
    (id, status) => {
      setRoleObj((prev) => {
        const newPermissions = new Set(prev?.permissions || []);
        status ? newPermissions.add(id) : newPermissions.delete(id);
        return {
          ...prev,
          permissions: Array.from(newPermissions),
        };
      });
    },
    [setRoleObj]
  );

  return (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      <TableContainer>
        <Table size="small" stickyHeader aria-label="permissions table">
          <TableHead sx={{ background: (theme) => theme.palette.primary.main }}>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <div className="mt-2">
                  <Iconify icon="tabler:layout-navbar-collapse-filled" />
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">Permission</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: 100 }}>
                Assign
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PERMISSION_LIST.map((row) => (
              <Row
                key={row.uuid}
                row={row}
                togglePermission={togglePermission}
                permissions={permissions}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default memo(PermissionListView);
