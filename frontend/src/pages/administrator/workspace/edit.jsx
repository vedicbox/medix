import { Button, Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import Iconify from "components/icons/Iconify";
import DisplayContent from "components/placeholder/DisplayContent";
import ClassicStepper from "components/stepper/ClassicStepper";
import { ADMINSTRATOR_CRUMB } from "list/breadcrumb-list";
import StaffFormUtil from "pages/dashboard/staff/enrollCrud/formUtil/StaffFormUtil";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrgMutation } from "service/adminstrator/orgService";
import { HTTP_STATUS_CODES } from "values/enum";
import OrgFormUtil from "./OrgFormUtil";

const stepperSteps = ["Workspace Enroll", "Admin Form"];

export default function WorkspaceEditPage() {
  const navigate = useNavigate();
  const orgFormRef = useRef(null);
  const staffFormRef = useRef(null);

  const [processObj, setProcessObj] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [createOrgMutation, { isLoading }] = useCreateOrgMutation();

  const onSubmit = async () => {
    const staffFormData = await staffFormRef.current.preparedData();

    if (staffFormData) {
      const formData = {
        staff: staffFormData,
        org: processObj.org,
      };

      let { data, error } = await createOrgMutation(formData);

      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        handleServerSideErrors(error?.data?.payload?.details);
      }
    }
  };

  const handleNext = async () => {
    const orgFormData = await orgFormRef.current.preparedData();

    setProcessObj((prev) => ({ ...prev, org: orgFormData }));

    if (orgFormData) setPageIndex(1);
  };

  const handleServerSideErrors = (errors = {}) => {
    staffFormRef.current?.setErrors(errors);
    orgFormRef.current?.setErrors(errors);
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={ADMINSTRATOR_CRUMB.MODULE.CREATE} />

      <ClassicStepper steps={stepperSteps} activeStep={pageIndex} />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <DisplayContent valid1={pageIndex === 0}>
            <OrgFormUtil
              processObj={processObj}
              setProcessObj={setProcessObj}
              ref={orgFormRef}
            />

            <div className="mt-4 text-center">
              <Button
                startIcon={<Iconify icon="iconamoon:player-next-duotone" />}
                variant="outlined"
                onClick={handleNext}
              >
                Proceed
              </Button>
            </div>
          </DisplayContent>
          <DisplayContent valid1={pageIndex === 1}>
            <StaffFormUtil
              processObj={processObj}
              setProcessObj={setProcessObj}
              ref={staffFormRef}
            />
            <div className="mt-4 d-flex justify-content-between">
              <Button
                startIcon={<Iconify icon="solar:rewind-back-bold-duotone" />}
                variant="outlined"
                onClick={() => setPageIndex(0)}
              >
                Back
              </Button>
              <MuiSubmitBtn onSubmit={onSubmit} />
            </div>
          </DisplayContent>
        </Grid>
      </Grid>
    </>
  );
}
