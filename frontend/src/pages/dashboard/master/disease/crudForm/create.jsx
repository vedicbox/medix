import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HTTP_STATUS_CODES } from "values/enum";
import { useCreateDiseaseMutation } from "service/diseaseService";
import DiseaseFormUtil from "./DiseaseFormUtil";

export default function DiseaseCreatePage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [createDiseaseMutation, { isLoading }] = useCreateDiseaseMutation();

  const handleSubmit = async () => {
    console.log('DiseaseCreatePage: formRef current ->', formRef.current);
    const formData = await formRef.current.preparedData();
     console.log('DiseaseCreatePage: preparedData ->', formData);
    
    if (formData) {
      let { data, error } = await createDiseaseMutation(formData);
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
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.MASTER.DISEASE.CREATE} />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <DiseaseFormUtil ref={formRef} />

          <div className="mt-4 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
