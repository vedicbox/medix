import { Grid } from "@mui/material";
import CrudClinicForm from "components/forms/master/CrudClinicForm";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { defaultTimeParser, encodeByComma } from "utils/parse";
import { CLINIC_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { WEEKS_ENUM } from "values/enum";

const CrudClinicMaster = forwardRef((props, ref) => {
  const { defaultError, processObj, setProcessObj, defaultData } = props;
  const formRef = useRef(null);

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(CLINIC_FORM_RULES);

  useEffect(() => {
    if (defaultError) {
      setErrors(defaultError);
    }
  }, [defaultError]);

  useImperativeHandle(ref, () => ({
    preparedData,
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

      const defaultWeeks = defaultData.weekOff || "";

      // Set the final processed object
      handleProcessObj({
        ...locationObj,
        status: defaultData.status,
        shiftFrom: defaultData.shiftFrom,
        shiftTo: defaultData.shiftTo,
        weekOff: WEEKS_ENUM.filter((item) => defaultWeeks.includes(item.key)),
      });
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const preparedData = () => {
    let formData = Object.fromEntries(new FormData(formRef.current));
    let weekOff = encodeByComma(processObj["weekOff"]);

    formData = {
      ...formData,
      weekOff: weekOff,
      shiftFrom: defaultTimeParser(processObj.shiftFrom),
      shiftTo: defaultTimeParser(processObj.shiftTo)
    };

    if (validateAll(formData)) return formData;
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
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <form ref={formRef}>
            <CrudClinicForm
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
              formRef={formRef}
              processObj={processObj}
              handleProcessObj={handleProcessObj}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
});

export default CrudClinicMaster;
