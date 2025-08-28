import PatientAddressForm from "components/forms/patients/enroll/AddressDetails";
import PatientContactForm from "components/forms/patients/enroll/ContactDetails";
import PatientDetailsForm from "components/forms/patients/enroll/PatientDetails";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { capitalizeFirstLetter } from "utils/parse";
import { PATIENT_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { validateWhatsapp } from "utils/security/validation";

const PatientFormUtil = forwardRef((props, ref) => {
  const { defaultData } = props;

  const [processObj, setProcessObj] = useState({});
  const formRef = useRef(null);

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(PATIENT_FORM_RULES);

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

    // Fetch the country data
    const countries = await GetCountries();
    let countryObj = countries.find((v) => v.name === defaultData["country"]);
    if (countryObj) {
      locationObj["country"] = countryObj;

      // Fetch the state data
      const statelist = await GetState(countryObj.id);
      let stateObj = statelist.find((v) => v.name === defaultData["state"]);
      if (stateObj) {
        locationObj["state"] = stateObj;

        // Fetch the city data
        const citylist = await GetCity(countryObj.id, stateObj.id);
        let cityObj = citylist.find((v) => v.name === defaultData["city"]);
        if (cityObj) {
          locationObj["city"] = cityObj;
        }
      }
    }

    setProcessObj({
      ...locationObj,
      dob: defaultData.dob,
      gender: defaultData.gender,
      martial: defaultData.martial,
      feet: defaultData.height.split(".")[0],
      inch: defaultData.height.split(".")[1],
      whatsappPref: defaultData.whatsappPref,
    });
  };

  useEffect(() => {
    if (defaultData?._id) initDefaultData();
  }, [defaultData]);

  const preparedData = async () => {
    const formData = Object.fromEntries(new FormData(formRef.current));

    formData.caseId = defaultData?.caseId;
    formData.dob = processObj.dob || "";
    formData.firstName = capitalizeFirstLetter(formData.firstName);
    formData.lastName = capitalizeFirstLetter(formData.lastName);
    formData.height = processObj.feet
      ? `${processObj.feet || 0}.${processObj.inch || 0}`
      : "";

    delete formData["feet"];
    delete formData["inch"];

    const validateObj = validateWhatsapp(formData);

    if (validateObj) {
      setErrors(validateObj);
      return;
    }

    const isValid = await validateAll(formData);
    if (isValid) return formData;
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
        <PatientDetailsForm
          errors={errors}
          processObj={processObj}
          handleProcessObj={handleProcessObj}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <PatientContactForm
          errors={errors}
          onChange={handleChange}
          onBlur={handleBlur}
          processObj={processObj}
          handleProcessObj={handleProcessObj}
        />
        <PatientAddressForm
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

export default PatientFormUtil;
