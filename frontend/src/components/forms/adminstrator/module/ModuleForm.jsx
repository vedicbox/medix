import MuiMultiSelectField from "components/mui/MuiMultiSelect";
import MuiTextField from "components/mui/MuiTextField";
import { PROJ_CATEGORY } from "list/optionsList";

export default function ModuleForm(props) {
  const { processObj, handleChange, handleBlur, errors, handleProcessObj } =
    props;


  return (
    <>
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
          value={processObj.category}
          options={PROJ_CATEGORY}
          handleProcessObj={handleProcessObj}
          error={errors["category"]}
        />
      </div>
    </>
  );
}
