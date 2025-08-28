import { Grid, IconButton } from "@mui/material";
import Iconify from "components/icons/Iconify";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { isDataArray } from "utils/parse";
import { ICON_NAME } from "values/img-links";
import ModuleListView from "./ModuleListView";
import RoleListView from "./RoleListView";

const PermissionUtils = forwardRef((props, ref) => {
  const { roles, roleColPicker } = props;
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);

  // Expose table methods via ref
  useImperativeHandle(ref, () => ({
    prepareData,
  }));

  const prepareData = () => {
    const formObj = {
      roleId: selectedRole,
      permission: Object.keys(selectedRows),
    };

    return formObj;
  };

  const navigateEdit = (row) => {
    const navigateObj = {
      _id: row._id,
      name: row.name,
      status: Number(row.status),
    };
    navigate(PARAMS_ROUTE.EDIT, { state: navigateObj });
  };

  const actionBox = (row) => (
    <IconButton onClick={() => navigateEdit(row)}>
      <Iconify icon={ICON_NAME.EDIT} />
    </IconButton>
  );

  const handleRoleSelected = (obj) => {
    setSelectedRole(obj._id);
    const cloneRows = {};
    isDataArray(obj.permission).map((item) => {
      cloneRows[item] = true;
    });
    setSelectedRows(cloneRows);
  };


  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <RoleListView
            rows={roles}
            actionBox={actionBox}
            selectedRole={selectedRole}
            setSelectedRole={handleRoleSelected}
            roleColPicker={roleColPicker}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ModuleListView
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
          />
        </Grid>
      </Grid>
    </>
  );
});

export default PermissionUtils;
