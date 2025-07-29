import MuiTextField from "components/mui/MuiTextField";
import { useEffect } from "react";

export default function CrudModuleForm(props) {
  const {
    defaultData,
    errors,
    formRef,
    onChange,
    onBlur,
  } = props;

  useEffect(() => {
    if (defaultData) {
      Object.entries(defaultData).forEach(([key, value]) => {
        // Find the input element by name
        const inputElement = formRef.current.elements[key];
        if (inputElement) {
          // Set the value of the input element
          inputElement.value = value;
        }
      });
    }
  }, [defaultData]);

  return (
    <form
      ref={formRef}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div>
        <MuiTextField
          label="Module Name"
          required={true}
          textProps={{
            name: "name",
            placeholder: "e.g. Abcd",
            onChange: onChange,
            onBlur: onBlur,
            slotProps: { htmlInput: { maxLength: 30 } },
          }}
          error={errors["name"]}
        />
      </div>

      <div className="mt-2">
        <MuiTextField
          label="Description"
          error={errors["desc"]}
          textProps={{
            name: "desc",
            rows: 2,
            multiline: true,
            onChange,
            onBlur,
          }}
        />
      </div>
    </form>
  );
}
