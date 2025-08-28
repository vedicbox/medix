import { Grid } from "@mui/material";
import ModuleForm from "components/forms/adminstrator/module/ModuleForm";
import SubModuleFormUtil from "components/forms/adminstrator/module/SubModuleUtil";
import FormHeading from "components/forms/element/FormHeading";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { MODULE_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";

const ModuleFormUtil = forwardRef((props, ref) => {
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
  } = useFormValidation(MODULE_FORM_RULES);

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
      subModules: defaultData.subModules,
    });
  };

  const preparedData = async () => {
    const moduleData = {
      ...Object.fromEntries(new FormData(formRef.current)),
      category: processObj.category,
      _id: defaultData?._id,
    };

    const isValid = await validateAll(moduleData);

    if (isValid) {
      let formData = {
        ...moduleData,
        subModules: processObj.subModules,
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

    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <FormHeading title="Module" icon="fluent-emoji:information">
            <form ref={formRef}>
              <ModuleForm
                processObj={processObj}
                handleProcessObj={handleProcessObj}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </form>
          </FormHeading>

          <SubModuleFormUtil
            setSubModules={setProcessObj}
            subModules={processObj.subModules || []}
          />
        </Grid>
      </Grid>
    </>
  );
});

export default ModuleFormUtil;
