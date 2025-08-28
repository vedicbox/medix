import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import PermissionUtils from "pages/utilPages/permissionUtil";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { PARAMS_ROUTE } from "routes/routeurl";
import {
  useGetAllRolesQuery,
  useUpdateRolePermissionsMutation,
} from "service/auth/roleService";
import { snackbar_slice } from "store/root-reducer/global";
import { SEVERITY_ENUM } from "values/enum";
import { ALERT_MSG } from "values/messages";
import RoleDialogBox from "./dialogBox/RoleDialog";

export default function MasterRolePage() {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const { data: tbData } = useGetAllRolesQuery();
  let rolePayload = tbData?.payload || [];

  const [updatePermissions, { isLoading: isUpdating }] =
    useUpdateRolePermissionsMutation();

  const handleSubmit = async () => {
    const formData = formRef.current.prepareData();

    if (!formData.roleId) {
      dispatch(
        snackbar_slice({
          severity: SEVERITY_ENUM.ERROR,
          msg: ALERT_MSG.ROLE_SELECT,
        })
      );
      return;
    }

    await updatePermissions(formData).unwrap();
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

      <PermissionUtils
        roles={rolePayload}
        ref={formRef}
        roleColPicker="roles"
      />

      <div className="mt-4 text-right">
        <MuiSubmitBtn
          text="Set Permission"
          onSubmit={handleSubmit}
          isLoading={isUpdating}
        />
      </div>

      <RoleDialogBox />
    </>
  );
}
