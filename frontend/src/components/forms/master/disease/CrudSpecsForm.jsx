import MuiSelectField from "components/mui/MuiSelectField";
import MuiTextField from "components/mui/MuiTextField";
import { STATUS_OPTIONS } from "list/optionsList";

export default function CrudSpecsForm(props) {
  const {
    errors,
    processObj,
    handleProcessObj,
    onChange,
    onBlur,
  } = props;

  return (
    <>
      <div>
        <MuiTextField
          label="Specs Name"
          required={true}
          textProps={{
            name: "name",
            placeholder: "e.g. Infertility",

            onChange: onChange,
            onBlur: onBlur,
            slotProps: { htmlInput: { maxLength: 30 } },
          }}
          error={errors["name"]}
        />
      </div>

      <div className="mt-2">
        <MuiSelectField
          label="Status"
          name="status"
          value={processObj["status"]}
          options={STATUS_OPTIONS}
          handleProcessObj={handleProcessObj}
          error={errors["status"]}
        />
      </div>
    </>
  );
}
