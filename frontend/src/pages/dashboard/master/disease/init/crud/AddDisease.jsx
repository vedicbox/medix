import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDiseaseMutation } from "service/master/diseaseService";
import { HTTP_STATUS_CODES } from "values/enum";
import DiseaseFormUtil from "./DiseaseFormUtil";

export default function AddDiseasePage() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [createDiseaseMutation, { isLoading }] = useCreateDiseaseMutation();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await createDiseaseMutation(formData);
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
      <DiseaseFormUtil ref={formRef} />

      <div className="mt-4 text-center">
        <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </>
  );
}
