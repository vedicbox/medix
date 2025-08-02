import { useCreateClinicMutation } from "service/clinicService";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import CrudClinicForm from "components/forms/master/CrudClinicForm";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { isDataArray } from "utils/parse";
import { STAFF_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { HTTP_STATUS_CODES } from "values/enum";
export default function ClinicAddPage() {
  const formRef = useRef(null);
  const [createClinic] = useCreateClinicMutation();
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
    let formData = Object.fromEntries(new FormData(formRef.current));
    let weekOff = isDataArray(processObj["weekOff"])
      .map((item) => item.key)
      .join(",");

    formData = {
      ...formData,
      weekOff: weekOff,
      shiftFrom: dayjs(processObj.shiftFrom).format("HH:mm"),
      shiftTo: dayjs(processObj.shiftTo).format("HH:mm"),
      breakFrom: dayjs(processObj.breakFrom).format("HH:mm"),
      breakTo: dayjs(processObj.breakTo).format("HH:mm"),
    };
    let { data, error } = await createClinic(formData);
    if (data?.status == HTTP_STATUS_CODES.OK) {
      navigate(-1);
    } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
      setErrors(error?.data?.payload?.details || {});
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
      <CrudClinicForm
        errors={errors}
        processObj={processObj}
        setProcessObj={setProcessObj}
        formRef={formRef}
        handleProcessObj={handleProcessObj}
      />

      <MuiSubmitBtn onSubmit={handleSubmit} className="text-center" />
    </>
  );
}
