import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateSpecsMutation } from "service/master/specService";
import { HTTP_STATUS_CODES } from "values/enum";
import SpecsCrudUtils from "./SpecsCrudUtils";

export default function UpdateSpecsPage() {
  const formRef = useRef(null);
  const defaultData = useLocation().state?.row;
  const [updateSpecs, { isLoading }] = useUpdateSpecsMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await updateSpecs(formData);
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
      <SpecsCrudUtils ref={formRef} defaultData={defaultData} />

      <MuiSubmitBtn
        onSubmit={handleSubmit}
        isLoading={isLoading}
        className="text-center mt-4"
      />
    </>
  );
}
