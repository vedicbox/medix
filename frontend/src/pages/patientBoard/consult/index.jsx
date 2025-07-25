import { Grid, Paper } from "@mui/material";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import ConsultFeeForm from "components/forms/patients/ConsultFeeForm";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlignPatientMutation } from "service/patientService";
import { useStafflistViaRoleQuery } from "service/staffService";
import { COLLECT_FEE_RULE } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { HTTP_STATUS_CODES } from "values/enum";

export default function ConsultInitPage() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  // const [errors, setErrors] = useState({});
  const assignPatientObJ = useSelector((state) => state.patient.assignObj);

  const [processObj, setProcessObj] = useState({});
  // Initialize the hook with your rules
  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(COLLECT_FEE_RULE);

  const [alignPatientMutation, { isLoading }] = useAlignPatientMutation();
  const { data: doclist } = useStafflistViaRoleQuery({
    roleName: "DOCTOR",
  });


  const handleSubmit = async () => {
    let formData = Object.fromEntries(new FormData(formRef.current));


    formData = {
      ...formData,
      payMode: processObj["payMode"]?.tag,
      assignDoc: processObj["assignDoc"]?._id,
      caseId: assignPatientObJ.caseId,
    };

    const isValid = await validateAll(formData);

    if (isValid) {
      let { data, error } = await alignPatientMutation(formData);

      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-2);
      } else if (error.data?.payload) {
        setErrors({ ...error.data?.payload });
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
      <Grid container justifyContent="center" className="my-5">
        <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
          <Paper elevation={3} className="p-4">
            <ConsultFeeForm
              formRef={formRef}
              doclist={doclist?.payload || []}
              processObj={processObj}
              handleProcessObj={handleProcessObj}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="mt-4 text-center">
              <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
