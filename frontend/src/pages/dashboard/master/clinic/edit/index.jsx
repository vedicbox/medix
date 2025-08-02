import { Grid } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import { STAFF_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import MuiUpdateBtn from "components/button/MuiUpdateBtn";
import { useEditClinicQuery } from "service/clinicService";
import CrudClinicForm from "components/forms/master/CrudClinicForm";
export default function ClinicUpdatePage() {
  const formRef = useRef(null);
   const { state: clinicId } = useLocation();
  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();
  const { data } = useEditClinicQuery({ id: clinicId });
  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(STAFF_FORM_RULES);

  const handleSubmit = async () => {
    // const isValid = await validateAll(formData);
    // if (isValid) {
    //   let { data, error } = await createStaffMutation(formData);
    //   if (data?.status == HTTP_STATUS_CODES.OK) {
    //     navigate(-1);
    //   } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
    //     setErrors(error?.data?.payload?.details || {});
    //   }
    // }
  };

  const handleProcessObj = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid size={10}>
          <CrudClinicForm
            errors={errors}
            processObj={processObj}
            setProcessObj={setProcessObj}
            formRef={formRef}
            defaultData={data?.payload || {}}
          />
          <MuiUpdateBtn onSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </>
  );
}
