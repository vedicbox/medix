import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import PatientAddressForm from "components/forms/patients/enroll/AddressDetails";
import PatientContactForm from "components/forms/patients/enroll/ContactDetails";
import PatientDetailsForm from "components/forms/patients/enroll/PatientDetails";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnrollPatientMutation } from "service/patientService";
import { capitalizeFirstLetter } from "utils/parse";
import { PATIENT_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { validateWhatsapp } from "utils/security/validation";
import { HTTP_STATUS_CODES } from "values/enum";

export default function PatientEnroll() {
  const [processObj, setProcessObj] = useState({});
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [enrollPatient, { isLoading }] = useEnrollPatientMutation();

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(PATIENT_FORM_RULES);

  const prepareFormData = useCallback(() => {
    const formData = Object.fromEntries(new FormData(formRef.current));

    formData.dob = processObj.dob || "";
    formData.firstName = capitalizeFirstLetter(formData.firstName);
    formData.lastName = capitalizeFirstLetter(formData.lastName);

    return formData;
  }, [processObj]);

  const handleSubmit = async () => {
    const formData = prepareFormData();

    const validateObj = validateWhatsapp(formData);

    if (validateObj) {
      setErrors(validateObj);
      return;
    }

    const isValid = await validateAll(formData);

    if (isValid) {
      formData.height = `${processObj.feet || 0}.${processObj.inch || 0}`;

      let { data, error } = await enrollPatient(formData);

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
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.PATIENTS.ENROLL} />

      <Grid container justifyContent="center">
        <Grid  size={{ xs: 12, lg: 10 }}>
          <form ref={formRef}>
            <PatientDetailsForm
              errors={errors}
              processObj={processObj}
              handleProcessObj={handleProcessObj}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <PatientContactForm
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
              processObj={processObj}
              handleProcessObj={handleProcessObj}
            />
            <PatientAddressForm
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
              processObj={processObj}
              handleProcessObj={handleProcessObj}
            />
          </form>
          <div className="mt-4 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
