import { Grid, Paper, Stack, Typography } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import StaffEnrollmentForm from "components/forms/staff/EnrollmentForm";
import EntityAssignForm from "components/forms/staff/EntityAssignForm";
import Iconify from "components/icons/Iconify";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStaffMutation } from "service/staffService";
import { capitalizeFirstLetter, parsePicker } from "utils/parse";
import { STAFF_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { validateWhatsapp } from "utils/security/validation";
import { HTTP_STATUS_CODES } from "values/enum";
import { ICON_NAME } from "values/img-links";

export default function AddStaff() {
  const formRef = useRef(null);

  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();
  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(STAFF_FORM_RULES);

  const [createStaffMutation, { isLoading }] = useCreateStaffMutation();


  const handleSubmit = async () => {
    const formData = Object.fromEntries(new FormData(formRef.current));

    formData["roleRef"] = processObj["roleRef"]?._id;
    formData["clinicRef"] = processObj["clinicRef"]?._id;
    formData["dob"] = parsePicker(processObj.dob, "date");
    formData.firstName = capitalizeFirstLetter(formData.firstName);
    formData.lastName = capitalizeFirstLetter(formData.lastName);

    const validateObj=validateWhatsapp(formData);
    if(validateObj){
      setErrors(validateObj);
      return;
    }

    const isValid = await validateAll(formData);

    if (isValid) {
      let { data, error } = await createStaffMutation(formData);

      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        setErrors(error?.data?.payload?.details || {});
      }
    }
  };

  const handleProcessObj = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.STAFF.ADD} />
      <Grid container justifyContent="center">
        <Grid size={{ lg: 10, xs: 12 }}>
          <Stack
            direction="row"
            sx={{
              bgcolor: (theme) => theme.palette.primary[50],
              p: "10px",
              borderBottomLeftRadius: 10,
              borderTopRightRadius: 10,
              mb: "5px",
              border: "1px solid #ccc",
            }}
          >
            <Iconify icon={ICON_NAME.DOC_ADD} />
            <Typography className="f-w-600 text-muted ml-2 f-italic">
              Staff Enroll Form
            </Typography>
          </Stack>

          <form ref={formRef}>
            <Paper sx={{ p: { md: 5, xs: 3 } }}>
              <StaffEnrollmentForm
                errors={errors}
                onChange={handleChange}
                onBlur={handleBlur}
                processObj={processObj}
                handleProcessObj={handleProcessObj}
              />
            </Paper>
            <div className="mt-3">
              <EntityAssignForm
                errors={errors}
                role={processObj.roleRef}
                handleProcessObj={handleProcessObj}
              />
            </div>
          </form>

          <div className="mt-3 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
