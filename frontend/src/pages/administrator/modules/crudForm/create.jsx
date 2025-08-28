import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { ADMINSTRATOR_CRUMB } from "list/breadcrumb-list";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateModuleMutation } from "service/adminstrator/moduleService";
import { HTTP_STATUS_CODES } from "values/enum";
import ModuleFormUtil from "./ModuleFormUtil";

export default function ModuleCreatePage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [createModuleMutation, { isLoading }] = useCreateModuleMutation();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await createModuleMutation(formData);
      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        handleServerSideErrors(error?.data?.payload?.details || {});
      }
    }
  };

  const handleServerSideErrors = (errors = {}) => {
    formRef.current?.setErrors(errors);
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={ADMINSTRATOR_CRUMB.MODULE.CREATE} />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <ModuleFormUtil ref={formRef} />

          <div className="mt-4 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
