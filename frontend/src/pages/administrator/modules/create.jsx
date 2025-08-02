import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import CrudModuleForm from "components/forms/adminstrator/crudModuleForm";
import { ADMINSTRATOR_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateModuleMutation } from "service/adminstrator/moduleService";
import { MODULE_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { HTTP_STATUS_CODES } from "values/enum";

export default function ModuleCreatePage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [processObj, setProcessObj] = useState({});

  const [createModuleMutation, { isLoading }] = useCreateModuleMutation();

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleErrorUpdate,
    validateAll,
  } = useFormValidation(MODULE_FORM_RULES);

  const handleMutationResponse = (data, error) => {
    if (data?.status === HTTP_STATUS_CODES.OK) {
      navigate(-1);
    } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
      setErrors(error?.data?.payload?.details || {});
    }
  };

  const onSubmit = async () => {
    if (!formRef.current) return;

    let packet = Object.fromEntries(new FormData(formRef.current));

    const isValid = await validateAll(packet);
    if (!isValid) return;

    packet["subModule"] = processObj.subModule;

    const { data, error } = await createModuleMutation(packet);
    handleMutationResponse(data, error);
  };

  return (
    <>
     <CollapsedBreadcrumbs breadlist={ADMINSTRATOR_CRUMB.MODULE.CREATE} />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <CrudModuleForm
            errors={errors}
            formRef={formRef}
            onChange={handleChange}
            onBlur={handleBlur}
            processObj={processObj}
            setProcessObj={setProcessObj}
          />

          <div className="mt-4 text-center">
            <MuiSubmitBtn onSubmit={onSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
