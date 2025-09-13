import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import CRUMB_NAV, { ADMINSTRATOR_CRUMB } from "list/crumb-list/crumbNav";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateModuleMutation } from "service/adminstrator/moduleService";
import { HTTP_STATUS_CODES } from "values/enum";
import ModuleFormUtil from "./ModuleFormUtil";

export default function ModuleUpdatePage() {
  const { row: defaultData } = useLocation().state;
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [updateModuleMutation, { isLoading }] = useUpdateModuleMutation();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await updateModuleMutation(formData);
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
      <CollapsedBreadcrumbs breadlist={CRUMB_NAV.module.update} />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <ModuleFormUtil ref={formRef} defaultData={defaultData} />

          <div className="mt-4 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
