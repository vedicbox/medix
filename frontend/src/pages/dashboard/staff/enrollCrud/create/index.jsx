import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStaffProfileMutation } from "service/staffService";
import { HTTP_STATUS_CODES } from "values/enum";
import EntityAssignUtil from "../formUtil/EntityAssignUtil";
import StaffFormUtil from "../formUtil/StaffFormUtil";

export default function AddStaff() {
  const staffFormRef = useRef(null);
  const clinicFormRef = useRef(null);

  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();

  const [createStaffMutation, { isLoading }] = useCreateStaffProfileMutation();

  const handleSubmit = async () => {
    const staffFormData = await staffFormRef.current.preparedData();
    const clinicFormData = await clinicFormRef.current.preparedData();

    if (staffFormData && clinicFormData) {
      const formData = {
        ...staffFormData,
        ...clinicFormData,
      };
      let { data, error } = await createStaffMutation(formData);

      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        handleServerSideErrors(error?.data?.payload?.details);
      }
    }
  };

  const handleServerSideErrors = (errors = {}) => {
    staffFormRef.current?.setErrors(errors);
    clinicFormRef.current?.setErrors(errors);
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.STAFF.ADD} />
      <Grid container justifyContent="center">
        <Grid size={{ lg: 10, xs: 12 }}>
          <StaffFormUtil
            processObj={processObj}
            setProcessObj={setProcessObj}
            ref={staffFormRef}
          />

          <div className="mt-3">
            <EntityAssignUtil
              processObj={processObj}
              setProcessObj={setProcessObj}
              ref={clinicFormRef}
            />
          </div>

          <div className="mt-3 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
