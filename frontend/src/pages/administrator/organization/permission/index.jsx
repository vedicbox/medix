import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { ADMINSTRATOR_CRUMB } from "list/breadcrumb-list";
import PermissionUtils from "pages/utilPages/permissionUtil";
import { useRef } from "react";
import {
  useGetAdminListQuery,
  useUpdateRolePermissionsMutation,
} from "service/auth/roleService";

export default function OrgPermission() {
  const formRef = useRef(null);

  const { data: roleData } = useGetAdminListQuery();
  let rolePayload = roleData?.payload?.rolelist || [];

  const [updatePermissions, { isLoading: isUpdating }] =
    useUpdateRolePermissionsMutation();

  const handleSubmit = () => {
    const formData = formRef.current.prepareData();

    updatePermissions(formData);
  };

  return (
    <>
      <ButtonBreadCrumbs breadlist={ADMINSTRATOR_CRUMB.ORG.PERMISSION} />

      <PermissionUtils
        roles={rolePayload}
        ref={formRef}
        roleColPicker="adminRoles"
      />

      <div className="mt-4 text-right">
        <MuiSubmitBtn
          text="Set Permission"
          isLoading={isUpdating}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
