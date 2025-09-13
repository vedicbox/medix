import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useUpdateDiseaseMutation } from "service/master/diseaseService";
import { HTTP_STATUS_CODES } from "values/enum";
import DiseaseFormUtil from "./DiseaseFormUtil";

export default function UpdateDiseasePage() {
  const { row: defaultData } = useLocation().state;
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [updateDiseaseMutation, { isLoading }] = useUpdateDiseaseMutation();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await updateDiseaseMutation(formData);
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
      <DiseaseFormUtil ref={formRef} defaultData={defaultData} />

      <div className="mt-4 text-center">
        <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </>
  );
}
