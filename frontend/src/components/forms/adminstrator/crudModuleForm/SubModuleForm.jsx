import MuiMultiSelectField from "components/mui/MuiMultiSelect";
import MuiTextField from "components/mui/MuiTextField";
import { PROJ_CATEGORY } from "list/optionsList";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { capitalizeFirstLetter } from "utils/parse";
import { MODULE_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { isValueExistInArray } from "utils/security/validation";

const SubModuleForm = forwardRef((props, ref) => {
  const { subModules = [] } = props;
  const formRef = useRef(null);
  const [category, setCategory] = useState("-");

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleErrorUpdate,
    validateAll,
  } = useFormValidation(MODULE_FORM_RULES);

  useImperativeHandle(ref, () => ({
    preparedData,
  }));

  const preparedData = async () => {
    if (!formRef.current) {
      console.error("Form reference is not attached.");
      return null;
    }
    let payload = Object.fromEntries(new FormData(formRef.current));
    payload.name = capitalizeFirstLetter(payload.name);

    const isNameExist = isValueExistInArray(payload.name, subModules);
    if (isNameExist) {
      setErrors({ name: "Name already exists." });
      return null;
    }

    let validate = await validateAll(payload);
    if (validate) {
      return payload;
    }
  };

  return (
    <form ref={formRef}>
      <div className="mb-4">
        <MuiTextField
          label="Name"
          required={true}
          textProps={{
            name: "name",
            placeholder: "e.g. Abcd",
            onChange: handleChange,
            onBlur: handleBlur,
            slotProps: { htmlInput: { maxLength: 30 } },
          }}
          error={errors["name"]}
        />
      </div>
      <div className="mb-4">
        <MuiTextField
          label="Tag"
          required={true}
          textProps={{
            name: "tag",
            placeholder: "e.g. tag",
            onChange: handleChange,
            onBlur: handleBlur,
            slotProps: { htmlInput: { maxLength: 30 } },
          }}
          error={errors["tag"]}
        />
      </div>
      <div className="mt-2">
        <MuiMultiSelectField
          label="Category"
          name="category"
          value={category}
          options={PROJ_CATEGORY}
          handleProcessObj={(obj) => setCategory(obj.category)}
          error={errors["category"]}
        />
      </div>
    </form>
  );
});

export default SubModuleForm;
