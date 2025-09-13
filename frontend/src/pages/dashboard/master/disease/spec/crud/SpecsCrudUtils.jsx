import CrudSpecsForm from "components/forms/master/disease/CrudSpecsForm";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SPECS_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";

const SpecsCrudUtils = forwardRef((props, ref) => {
  const { defaultData } = props;
  const formRef = useRef(null);
  const [processObj, setProcessObj] = useState({});

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(SPECS_FORM_RULES);

  useEffect(() => {
    if (defaultData?._id) {
      formRef.current.name.value = defaultData?.name || "";
      handleProcessObj({ status: Number(defaultData.status) });
    }
  }, [defaultData]);

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
      <form ref={formRef}>
        <CrudSpecsForm
          errors={errors}
          processObj={processObj}
          handleProcessObj={handleProcessObj}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </form>
    </>
  );
});

export default SpecsCrudUtils;
