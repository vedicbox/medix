import { FormHelperText, InputLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default function MuiDatePicker(props) {
  const {
    label,
    name,
    error,
    helperText,
    required = true,
    handleProcessObj,
    value,
    pickerProps,
  } = props;

  const onAccept = (val) => {
    handleProcessObj({ [name]: val }, name, val);
  };

  const dateValue = value ? dayjs(value, "YYYY-MM-DD") : null;

  return (
    <>
      <InputLabel error={!!error}>
        {label} <span className="c-red">{required ? "*" : ""}</span>
      </InputLabel>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                inputProps: { readOnly: true },
                error: !!error,
              },
            }}
            value={dateValue}
            onAccept={onAccept}
            
            {...pickerProps}
          />
        </DemoContainer>
      </LocalizationProvider>

      <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
    </>
  );
}
