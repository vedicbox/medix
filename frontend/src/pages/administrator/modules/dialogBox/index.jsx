import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import { memo, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useCreateModuleMutation } from "service/adminstrator/moduleService";
import { MODULE_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { HTTP_STATUS_CODES } from "values/enum";
import { ICON_NAME } from "values/img-links";
import CreateModulePage from "./CreateModule";

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

export default function ModuleDialogBox({ dialogObj, setDialogObj }) {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [createModuleMutation] = useCreateModuleMutation();

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleErrorUpdate,
    validateAll,
  } = useFormValidation(MODULE_FORM_RULES);

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

    const { data, error } = await createModuleMutation(packet);
    handleMutationResponse(data, error);
  }, [createModuleMutation, handleMutationResponse]);

  // These don't need to be memoized as they're simple and stable
  const createBoxAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.SUBMIT} />}
      onClick={handleRoleCreate}
    >
      Create
    </Button>
  );

  // Memoize the route elements to prevent re-renders when parent state changes
  const createRouteElement = useMemo(
    () => (
      <DialogContainer
        actionContainer={createBoxAction}
        title="New Module"
        onClose={handleClose}
      >
        <CreateModulePage
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

  const routelist = [
    {
      path: PARAMS_ROUTE.CREATE,
      baseProps: {
        element: createRouteElement,
        title: "Create Role",
      },
    },
  ];

  return <ChildRoutes routelist={routelist} />;
}
