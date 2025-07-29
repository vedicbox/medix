import CrudModuleForm from "components/forms/adminstrator/CrudModuleForm";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const CreateModulePage = forwardRef((props, ref) => {
  const { handleChange, handleBlur, errors } = props;
  const formRef = useRef(null);

  useImperativeHandle(ref, () => ({
    preparedData,
  }));

  const preparedData = async () => {
    if (!formRef.current) {
      console.error("Form reference is not attached.");
      return null;
    }
    let payload = Object.fromEntries(new FormData(formRef.current));

    return payload;
  };

  return (
    <>
      <CrudModuleForm
        errors={errors}
        formRef={formRef}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
});

export default CreateModulePage;
