import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HTTP_STATUS_CODES } from "values/enum";
import DiseaseFormUtil from "./DiseaseFormUtil";
import { useUpdateDiseaseMutation } from "service/diseaseService";

export default function DiseaseUpdatePage() {
  const { row: defaultData } = useLocation().state;
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [updateDiseaseMutation, { isLoading }] = useUpdateDiseaseMutation();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await updateDiseaseMutation(formData);
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
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.MASTER.DISEASE.UPDATE} />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <DiseaseFormUtil ref={formRef} defaultData={defaultData} />

          <div className="mt-4 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
