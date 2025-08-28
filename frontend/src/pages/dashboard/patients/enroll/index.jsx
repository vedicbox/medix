import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import PatientFormUtil from "components/forms/patients/enroll/PatientDetailUtil";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEnrollPatientMutation } from "service/patientService";
import { HTTP_STATUS_CODES } from "values/enum";

export default function PatientEnroll() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [enrollPatient, { isLoading }] = useEnrollPatientMutation();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await enrollPatient(formData);

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
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.PATIENTS.ENROLL} />

      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <PatientFormUtil ref={formRef} />
          <div className="mt-4 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
