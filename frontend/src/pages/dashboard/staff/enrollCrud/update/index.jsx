import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetStaffByIdQuery,
  useUpdateStaffProfileMutation,
} from "service/staffService";
import { HTTP_STATUS_CODES } from "values/enum";
import EntityAssignUtil from "../formUtil/EntityAssignUtil";
import StaffFormUtil from "../formUtil/StaffFormUtil";

export default function UpdateStaff() {
  const { staffId } = useLocation()?.state || {};

  const clinicFormRef = useRef(null);
  const staffFormRef = useRef(null);

  const [processObj, setProcessObj] = useState({});

  const navigate = useNavigate();

  const { data: profData } = useGetStaffByIdQuery({ staffId: staffId });
  const profDefaultData = profData?.payload || {};

  const [updateStaffMutation, { isLoading }] = useUpdateStaffProfileMutation();

  const handleSubmit = async () => {
    const staffFormData = await staffFormRef.current.preparedData();
    const clinicFormData = await clinicFormRef.current.preparedData();

    if (staffFormData && clinicFormData) {
      const formData = {
        staffId: profDefaultData._id,
        userId: profDefaultData.userRef._id,
        ...staffFormData,
        ...clinicFormData,
      };
      let { data, error } = await updateStaffMutation(formData);

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
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.STAFF.EDIT} />

      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <StaffFormUtil
            processObj={processObj}
            setProcessObj={setProcessObj}
            ref={staffFormRef}
            defaultData={profDefaultData}
          />

          <div className="mt-3">
            <EntityAssignUtil
              processObj={processObj}
              setProcessObj={setProcessObj}
              ref={clinicFormRef}
              defaultData={profDefaultData}
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
