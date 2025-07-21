import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import { useCallback, useRef, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { PARAMS_ROUTE } from "routes/routeurl";
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from "service/auth/roleService";
import { ROLES_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { HTTP_STATUS_CODES } from "values/enum";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";
import { ICON_NAME } from "values/img-links";

// Memoized Dialog Container to prevent unnecessary re-renders
const DialogContainer = memo(({ title, actionContainer, children, onClose }) => (
  <ClassicDialog
    open={true}
    title={title}
    handleToggle={onClose}
    actionContainer={actionContainer}
  >
    {children}
  </ClassicDialog>
));

export default function RoleDialogBox({ dialogObj, setDialogObj }) {
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
    validateAll
  } = useFormValidation(ROLES_FORM_RULES);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleMutationResponse = useCallback((data, error) => {
    if (data?.status === HTTP_STATUS_CODES.OK) {
      navigate(-1);
    } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
      setErrors(error?.data?.payload?.details || {});
    }
  }, [navigate, setErrors]);

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

  // These don't need to be memoized as they're simple and stable
  const createBoxAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.ADD_NEW} />}
      onClick={handleRoleCreate}
    >
      Create
    </Button>
  );

  const updateBoxAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.UPDATE} />}
      onClick={handleRoleUpdate}
    >
      Update
    </Button>
  );

  // Memoize the route elements to prevent re-renders when parent state changes
  const createRouteElement = useMemo(() => (
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
  ), [createBoxAction, handleClose, errors, handleBlur, handleChange, handleErrorUpdate]);

  const updateRouteElement = useMemo(() => (
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
  ), [updateBoxAction, handleClose, errors, handleBlur, handleChange, handleErrorUpdate]);

  const routelist = [
    {
      path: PARAMS_ROUTE.CREATE,
      element: createRouteElement,
    },
    {
      path: PARAMS_ROUTE.EDIT,
      element: updateRouteElement,
    },
  ];

  return <ChildRoutes routelist={routelist} />;
}