import MuiSelectField from "components/mui/MuiSelectField";
import MuiTextField from "components/mui/MuiTextField";
import { STATUS_OPTIONS } from "list/optionsList";
import { useEffect } from "react";
import { HELPER_TXT_MSG } from "values/messages";

export default function CrudSpecsForm(props) {
  const { defaultData, errors, formRef, processObj, handleProcessObj, onChange, onBlur } = props;

  useEffect(() => {
    if (defaultData) {
      formRef.current.name.value = defaultData?.name || "";
      handleProcessObj({ status: defaultData.status });
    }
  }, [defaultData]);

  return (
    <form
      ref={formRef}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
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
    </form>
  );
}
