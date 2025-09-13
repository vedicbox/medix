import CrudMeetingForm from "components/forms/staff/CrudMeetingForm";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { CLINIC_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";

const MeetingFormUtil = forwardRef((props, ref) => {
  const { processObj, setProcessObj, defaultData } = props;
  const formRef = useRef(null);

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(CLINIC_FORM_RULES);

  useImperativeHandle(ref, () => ({
    preparedData,
    setErrors,
  }));

  const initDefaultData = async () => {
    // Iterate over the entries of the flat default data
    Object.entries(defaultData).forEach(([key, value]) => {
      // Find the input element by name
      const inputElement = formRef.current.elements[key];
      if (inputElement) {
        // Set the value of the input element
        inputElement.value = value;
      }
    });

    let locationObj = {};

    try {
      // Set the final processed object
      handleProcessObj({
        ...locationObj,
      });
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const preparedData = async () => {
    let formData = Object.fromEntries(new FormData(formRef.current));
    console.log(processObj);
    const isValid = await validateAll(processObj);
    if (isValid) return processObj;
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
        <CrudMeetingForm
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

export default MeetingFormUtil;
