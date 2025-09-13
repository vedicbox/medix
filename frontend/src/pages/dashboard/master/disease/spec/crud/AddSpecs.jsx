import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSpecsMutation } from "service/master/specService";
import { HTTP_STATUS_CODES } from "values/enum";
import SpecsCrudUtils from "./SpecsCrudUtils";

export default function AddSpecsPage() {
  const formRef = useRef(null);
  const [createSpecs, { isLoading }] = useCreateSpecsMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await createSpecs(formData);
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
      <SpecsCrudUtils ref={formRef} />

      <MuiSubmitBtn
        onSubmit={handleSubmit}
        isLoading={isLoading}
        className="text-center mt-4"
      />
    </>
  );
}
