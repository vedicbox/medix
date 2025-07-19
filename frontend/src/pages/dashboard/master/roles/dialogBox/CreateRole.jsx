import CrudRoleForm from "components/forms/master/CrudRoleForm";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const CreateRoleForm = forwardRef((props, ref) => {
  const { handleChange,handleBlur ,handleErrorUpdate,errors} = props
  const formRef = useRef(null);
  const [processObj, setProcessObj] = useState({});

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


  const handleProcessObj = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };

  return (
    <>
      <CrudRoleForm
        errors={errors}
        formRef={formRef}
        processObj={processObj}
        handleProcessObj={handleProcessObj}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
});

export default CreateRoleForm;
