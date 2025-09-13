import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import { DASH_TAG } from "config/module/tags";
import { memo, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/panel/ChildRoutePanel";
import { PARAMS_ROUTE } from "routes/routeurl";
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from "service/auth/roleService";
import { parseModuleTag } from "utils/parse";
import { ROLES_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { HTTP_STATUS_CODES } from "values/enum";
import { ICON_NAME } from "values/img-links";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";

// Memoized Dialog Container to prevent unnecessary re-renders
const DialogContainer = memo(
  ({ title, actionContainer, children, onClose }) => (
    <ClassicDialog
      open={true}
      title={title}
      handleToggle={onClose}
      actionContainer={actionContainer}
    >
      {children}
    </ClassicDialog>
  )
);

export default function RoleDialogBox() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [createRoleMutation] = useCreateRoleMutation();
  const [updateRoleMutation] = useUpdateRoleMutation();

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleErrorUpdate,
    validateAll,
  } = useFormValidation(ROLES_FORM_RULES);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleMutationResponse = useCallback(
    (data, error) => {
      if (data?.status === HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        setErrors(error?.data?.payload?.details || {});
      }
    },
    [navigate, setErrors]
  );

  const handleRoleCreate = useCallback(async () => {
    if (!formRef.current) return;
    const packet = await formRef.current.preparedData();
    const isValid = await validateAll(packet);
    if (!isValid) return;

    const { data, error } = await createRoleMutation(packet);
    handleMutationResponse(data, error);
  }, [createRoleMutation, handleMutationResponse]);

  const handleRoleUpdate = useCallback(async () => {
    if (!formRef.current) return;
    const packet = await formRef.current.preparedData();
    const isValid = await validateAll(packet);
    if (!isValid) return;

    const { data, error } = await updateRoleMutation(packet);
    handleMutationResponse(data, error);
  }, [updateRoleMutation, handleMutationResponse]);

  const createBoxAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.SUBMIT} />}
      onClick={handleRoleCreate}
    >
      Create
    </Button>
  );

  const updateBoxAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.SUBMIT} />}
      onClick={handleRoleUpdate}
    >
      Update
    </Button>
  );

  const createRouteElement = useMemo(
    () => (
      <DialogContainer
        actionContainer={createBoxAction}
        title="New Role"
        onClose={handleClose}
      >
        <CreateRole
          ref={formRef}
          handleErrorUpdate={handleErrorUpdate}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </DialogContainer>
    ),
    [
      createBoxAction,
      handleClose,
      errors,
      handleBlur,
      handleChange,
      handleErrorUpdate,
    ]
  );

  const updateRouteElement = useMemo(
    () => (
      <DialogContainer
        actionContainer={updateBoxAction}
        title="Update Role"
        onClose={handleClose}
      >
        <UpdateRole
          ref={formRef}
          handleErrorUpdate={handleErrorUpdate}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </DialogContainer>
    ),
    [
      updateBoxAction,
      handleClose,
      errors,
      handleBlur,
      handleChange,
      handleErrorUpdate,
    ]
  );

  const routelist = [
    {
      path: PARAMS_ROUTE.CREATE,
      uuid: parseModuleTag(DASH_TAG.ROLE_MASTER).uuid,
      baseProps: {
        element: createRouteElement,
        title: "Create Role",
      },
    },
    {
      path: PARAMS_ROUTE.EDIT,
      uuid: parseModuleTag(DASH_TAG.ROLE_MASTER).uuid,
      baseProps: {
        element: updateRouteElement,
        title: "Update Role",
      },
    },
  ];

  return <ChildRoutes routelist={routelist} />;
}
