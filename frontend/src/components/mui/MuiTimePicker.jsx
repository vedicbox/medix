import { FormHelperText, InputLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function MuiTimePicker(props) {
  const {
    label,
    error,
    helperText,
    required = true,
    name,
    handleProcessObj,
    value,
  } = props;

  const onAccept = (val) => {
    handleProcessObj({ [name]: val });
  };

  const timeValue = value ? dayjs(value, "HH:mm") : null;

  return (
    <>
      <InputLabel error={!!error}>
        {label} <span className="c-red">{required ? "*" : ""}</span>
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            minutesStep={15}
            value={timeValue}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                inputProps: { readOnly: true },
              },
            }}
            skipDisabled
            onAccept={onAccept}
          />
        </DemoContainer>
      </LocalizationProvider>

      <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
    </>
  );
}