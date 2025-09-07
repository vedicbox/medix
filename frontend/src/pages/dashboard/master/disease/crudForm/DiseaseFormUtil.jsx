import { Grid } from "@mui/material";
import DiseaseForm from "components/forms/adminstrator/module/DiseaseForm";
import SubDiseaseFormUtil from "components/forms/adminstrator/module/SubDiseaseFormUtil";
import FormHeading from "components/forms/element/FormHeading";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { DISEASE_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";

const DiseaseFormUtil = forwardRef((props, ref) => {
  const { defaultData = {} } = props;
  const formRef = useRef(null);
  const [processObj, setProcessObj] = useState({});

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(DISEASE_FORM_RULES);

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
      subDiseases: defaultData?.subDiseases || [],
    });
  };

  const preparedData = async () => {
    const diseaseData = {
      ...Object.fromEntries(new FormData(formRef.current)),
      _id: defaultData?._id,
    };  
    const isValid = await validateAll(diseaseData);
 
    if (isValid) {
      let formData = {
        ...diseaseData,
        subDiseases: processObj.subDiseases || [],
      };
      return formData;
    }
  };

  useEffect(() => {
    if (defaultData?._id) initDefaultData();
  }, [defaultData]);

  const handleProcessObj = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    console.log(obj);
    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <FormHeading title="Disease" icon="fluent-emoji:information">
            <form ref={formRef}>
              <DiseaseForm
                processObj={processObj}
                handleProcessObj={handleProcessObj}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </form>
          </FormHeading>

          <SubDiseaseFormUtil
            setSubDiseases={handleProcessObj}
            subDiseases={processObj.subDiseases || []}
          />
        </Grid>
      </Grid>
    </>
  );
});

export default DiseaseFormUtil;
