import OrgEnrollForm from "components/forms/adminstrator/org/EnrollForm";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { ORG_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";

const OrgFormUtil = forwardRef((props, ref) => {
  const { processObj, setProcessObj, defaultData } = props;
  const formRef = useRef(null);

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(ORG_FORM_RULES);

  useImperativeHandle(ref, () => ({
    preparedData,
    setErrors,
  }));

  const initDefaultData = async () => {
    Object.entries(defaultData).forEach(([key, value]) => {
      const inputElement = formRef.current.elements[key];
      if (inputElement) {
        inputElement.value = value;
      }
    });

    setProcessObj({
      category: defaultData.category,
      status: Number(defaultData.status),
    });
  };

  const preparedData = async () => {
    let formData = Object.fromEntries(new FormData(formRef.current));

    formData = {
      ...formData,
      category: processObj.category,
      status: processObj.status,
    };

    const isValid = await validateAll(formData);
    if (isValid) return formData;
  };

  useEffect(() => {
    if (defaultData?._id) initDefaultData();
  }, [defaultData]);

  const handleProcessObj = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };

  return (
    <>
      <form ref={formRef}>
        <OrgEnrollForm
          errors={errors}
          onChange={handleChange}
          onBlur={handleBlur}
          processObj={processObj}
          handleProcessObj={handleProcessObj}
        />
      </form>
    </>
  );
});

export default OrgFormUtil;
