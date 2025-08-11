import { Grid } from "@mui/material";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PARAMS_ROUTE } from "routes/routeurl";
import {
  useGetTBRolesQuery,
  useUpdatePermissionsMutation,
} from "service/auth/roleService";
import { snackbar_slice } from "store/root-reducer/global";
import { SEVERITY_ENUM } from "values/enum";
import { ALERT_MSG } from "values/messages";
import RoleDialogBox from "./dialogBox/RoleDialog";
import PermissionListView from "./elements/PermissionListView";
import RoleListView from "./elements/RoleListView";

export default function MasterRolePage() {
  const [roleObj, setRoleObj] = useState({});
  const dispatch = useDispatch();

  const { data: tbData } = useGetTBRolesQuery();
  let rolePayload = tbData?.payload?.rolelist || [];
  const [updatePermissions, { isLoading: isUpdating }] =
    useUpdatePermissionsMutation();

  const handleRoleSelect = (event) => {
    const roleId = event.target.value;
    const permissions = rolePayload.find(
      (item) => item._id == roleId
    )?.permission;

    setRoleObj((prev) => ({
      roleId,
      permissions,
    }));
  };

  const handleSumitPermission = async () => {
    if (!roleObj.roleId) {
      dispatch(
        snackbar_slice({
          severity: SEVERITY_ENUM.ERROR,
          msg: ALERT_MSG.ROLE_SELECT,
        })
      );
      return;
    }
    try {
      await updatePermissions(roleObj).unwrap();
      // Optionally show success message or refresh data
    } catch (err) {
      // Optionally handle error
    }
  };

  const topBar = [
    {
      label: "Create Role",
      icon: "basil:add-solid",
      link: {
        pathname: PARAMS_ROUTE.CREATE,
      },
    },
  ];

  return (
    <>
      <ButtonBreadCrumbs
        breadlist={DASHBOARD_CRUMB.ROLES.MANAGE}
        topBar={topBar}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <RoleListView
            handleRoleSelect={handleRoleSelect}
            roleSelect={roleObj.roleId}
            rolePayload={rolePayload}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <PermissionListView roleObj={roleObj} setRoleObj={setRoleObj} />
        </Grid>
      </Grid>

      <div className="mt-4 text-right">
        <MuiSubmitBtn
          text="Set Permission"
          onSubmit={handleSumitPermission}
          isLoading={isUpdating}
        />
      </div>

      <RoleDialogBox />
    </>
  );
}
