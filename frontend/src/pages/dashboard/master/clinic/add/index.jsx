import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import CrudClinicForm from "components/forms/master/CrudClinicForm";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STAFF_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";

export default function ClinicAddPage() {
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
      <CrudClinicForm
        errors={errors}
        processObj={processObj}
        setProcessObj={setProcessObj}
        formRef={formRef}
      />

        <MuiSubmitBtn onSubmit={handleSubmit} />
    </>
  );
}
