import CrudRoleForm from "components/forms/master/CrudRoleForm";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateRole = forwardRef((props, ref) => {
  const { handleChange,handleBlur ,handleErrorUpdate,errors} = props
  const { state } = useLocation();
  const formRef = useRef(null);
  const [processObj, setProcessObj] = useState({});

 

  // Use useImperativeHandle to expose the resetForm method to the parent
  useImperativeHandle(ref, () => ({
    preparedData,
  }));

  const preparedData = async () => {
    if (!formRef.current) {
      console.error("Form reference is not attached.");
      return null;
    }
    let payload = Object.fromEntries(new FormData(formRef.current));
    payload._id = state._id;
 
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
        defaultData={state}
      />
    </>
  );

});

export default UpdateRole;
