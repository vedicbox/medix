import MuiTextField from "components/mui/MuiTextField";
import MuiSelectField from "components/mui/MuiSelectField";
import { STATUS_OPTIONS } from "list/optionsList";

export default function DiseaseForm(props) {
  const { processObj, handleChange, handleBlur, errors, handleProcessObj } = props;

  return (
    <>
      <div className="mb-4">
        <MuiTextField
          label="Name"
          required={true}
          textProps={{
            name: "name",
            placeholder: "e.g. Infertility",
            onChange: handleChange,
            onBlur: handleBlur,
            slotProps: { htmlInput: { maxLength: 30 } },
          }}
          error={errors["name"]}
        />
      </div>
      <div className="mt-2">
        <MuiSelectField
          label="Status"
          name="status"
          value={processObj.status}
          options={STATUS_OPTIONS}
          handleProcessObj={handleProcessObj}
          error={errors["status"]}
        />
      </div>
    </>
  );
}
