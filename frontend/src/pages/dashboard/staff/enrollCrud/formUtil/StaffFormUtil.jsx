import FormHeading from "components/forms/element/FormHeading";
import StaffCrudForm from "components/forms/staff/CrudForm";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import {
  capitalizeFirstLetter,
  convertNestedToPlainObj,
  parsePicker,
} from "utils/parse";
import { STAFF_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { ICON_NAME } from "values/img-links";

const StaffFormUtil = forwardRef((props, ref) => {
  const { processObj, setProcessObj, defaultData } = props;
  const formRef = useRef(null);

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(STAFF_FORM_RULES);

  useImperativeHandle(ref, () => ({
    preparedData,
    setErrors,
  }));

  const initDefaultData = async () => {
    const parseObj = convertNestedToPlainObj(defaultData);

    Object.entries(parseObj).forEach(([key, value]) => {
      const inputElement = formRef.current.elements[key];
      if (inputElement) {
        inputElement.value = value;
      }
    });

    let locationObj = {};

    try {
      const countries = await GetCountries();
      let countryObj = countries.find((v) => v.name === parseObj["country"]);
      if (countryObj) {
        locationObj["country"] = countryObj;

        const statelist = await GetState(countryObj.id);
        let stateObj = statelist.find((v) => v.name === parseObj["state"]);
        if (stateObj) {
          locationObj["state"] = stateObj;

          const citylist = await GetCity(countryObj.id, stateObj.id);
          let cityObj = citylist.find((v) => v.name === parseObj["city"]);
          if (cityObj) {
            locationObj["city"] = cityObj;
          }
        }
      }

      // Set the final processed object
      handleProcessObj({
        gender: parseObj["gender"],
        dob: parseObj["dob"],
        whatsappPref: parseObj.whatsappPref,
        ...locationObj,
      });
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const preparedData = async () => {
    let formData = Object.fromEntries(new FormData(formRef.current));

    formData = {
      ...formData,
      dob: parsePicker(processObj.dob, "date"),
      firstName: capitalizeFirstLetter(formData.firstName),
      lastName: capitalizeFirstLetter(formData.lastName),
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
      <FormHeading title=" Staff Enroll Form" icon={ICON_NAME.DOC_ADD}>
        <form ref={formRef}>
          <StaffCrudForm
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            processObj={processObj}
            handleProcessObj={handleProcessObj}
          />
        </form>
      </FormHeading>
    </>
  );
});

export default StaffFormUtil;
