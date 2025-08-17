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
  } = props;

  const onAccept = (val) => {
    handleProcessObj({ [name]: val });
  };

  const dateValue = value
    ? dayjs(value, "YYYY-MM-DD")
    : dayjs("2022-04-17", "YYYY-MM-DD");

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
              },
            }}
            value={dateValue}
            onAccept={onAccept}
          />
        </DemoContainer>
      </LocalizationProvider>

      <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
    </>
  );
}
