import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { isDataArray } from "utils/parse";

export default function MuiSelectField(props) {
  const {
    name,
    value,
    label,
    error,
    helperText,
    required = true,
    textProps,
    handleProcessObj,
    options,
  } = props;

  const onChange = (e) => {
    handleProcessObj({ [name]: e.target.value });
  };

  const selectedValue = value === null || value === undefined ? "-" : value;

  return (
    <>
      <InputLabel error={!!error} className="mb-2">
        {label} <span className="c-red">{required ? "*" : ""}</span>
      </InputLabel>
      <Select
        fullWidth
        name={name}
        value={selectedValue}
        error={!!error}
        onChange={onChange}
        size="small"
        {...textProps}
      >
        <MenuItem value="-">Please Select</MenuItem>
        {isDataArray(options).map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
    </>
  );
}
