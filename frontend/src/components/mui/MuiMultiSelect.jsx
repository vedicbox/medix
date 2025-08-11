import {
  Checkbox,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { isDataArray } from "utils/parse";

export default function MuiMultiSelectField(props) {
  const {
    name,
    value = [],
    label,
    error,
    helperText,
    required = true,
    textProps,
    handleProcessObj,
    options = [],
  } = props;

  const onChange = (event) => {
    const {
      target: { value: selectedValues },
    } = event;

    // Remove the "-" placeholder if it exists in the selection
    const filteredValues = selectedValues.filter((val) => val !== "-");

    handleProcessObj({
      [name]: filteredValues,
    });
  };

  // Ensure value is always an array and filter out invalid values
  const selectedValue = Array.isArray(value)
    ? value.filter((val) => options.some((opt) => opt.value === val))
    : [];

  return (
    <>
      <InputLabel error={!!error} className="mb-2">
        {label} {required && <span className="c-red">*</span>}
      </InputLabel>
      <Select
        fullWidth
        multiple
        name={name}
        value={selectedValue.length ? selectedValue : ["-"]}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.includes("-")) {
            return "Please Select";
          }
          return selected
            .map((value) => {
              const option = options.find((opt) => opt.value === value);
              return option ? option.label : value;
            })
            .join(", ");
        }}
        error={!!error}
        onChange={onChange}
        size="small"
        {...textProps}
      >
        <MenuItem disabled value="-">
          Please Select
        </MenuItem>
        {isDataArray(options).map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Checkbox checked={selectedValue.includes(item.value)} />
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
      )}
    </>
  );
}
