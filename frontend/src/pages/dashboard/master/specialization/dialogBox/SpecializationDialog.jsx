import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import { memo, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { PARAMS_ROUTE } from "routes/routeurl";
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from "service/auth/roleService";
import { SPECS_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { HTTP_STATUS_CODES } from "values/enum";
import { ICON_NAME } from "values/img-links";
import { parseModuleTag } from "utils/parse";
import { DASH_TAG } from "config/module/tags";
import UpdateSpecialization from "./UpdateSpecialization";
import CreateSpecializationForm from "./CreateSpecialization";
import { useCreateSpecsMutation, useUpdateSpecsMutation } from "service/sepcsService";

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

export default function SpecializationDialogBox({ dialogObj, setDialogObj }) {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [createSpecsMutation] = useCreateSpecsMutation();
  const [updateSpecsMutation] = useUpdateSpecsMutation();

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleErrorUpdate,
    validateAll,
  } = useFormValidation(SPECS_FORM_RULES);

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

  const handleSpecsCreate = useCallback(async () => {
    if (!formRef.current) return;
    const packet = await formRef.current.preparedData();
    const isValid = await validateAll(packet);
    if (!isValid) return;

    const { data, error } = await createSpecsMutation(packet);
    handleMutationResponse(data, error);
  }, [createSpecsMutation, handleMutationResponse]);

  const handleSpecsUpdate = useCallback(async () => {
    if (!formRef.current) return;
    const packet = await formRef.current.preparedData();
    const isValid = await validateAll(packet);
    if (!isValid) return;

    const { data, error } = await updateSpecsMutation(packet);
    handleMutationResponse(data, error);
  }, [updateSpecsMutation, handleMutationResponse]);

  // These don't need to be memoized as they're simple and stable
  const createBoxAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.SUBMIT} />}
      onClick={handleSpecsCreate}
    >
      Create
    </Button>
  );

  const updateBoxAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.SUBMIT} />}
      onClick={handleSpecsUpdate}
    >
      Update
    </Button>
  );

  // Memoize the route elements to prevent re-renders when parent state changes
  const createRouteElement = useMemo(
    () => (
      <DialogContainer
        actionContainer={createBoxAction}
        title="New Specialization"
        onClose={handleClose}
      >
        <CreateSpecializationForm
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
        title="Update Specialization"
        onClose={handleClose}
      >
        <UpdateSpecialization
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
      uuid: parseModuleTag(DASH_TAG.SPECIALIZATION_MASTER).uuid,
      baseProps: {
        element: createRouteElement,
        title: "Create Specialization",
      },
    },
    {
      path: PARAMS_ROUTE.EDIT,
      uuid: parseModuleTag(DASH_TAG.SPECIALIZATION_MASTER).uuid,
      baseProps: {
        element: updateRouteElement,
        title: "Update Specialization",
      },
    },
  ];

  return <ChildRoutes routelist={routelist} />;
}
