import { FormHelperText, InputLabel, OutlinedInput } from "@mui/material";

export default function MuiOutlinedField(props) {
  const { label, error, helperText, required = true, textProps } = props;
  return (
    <>
      <InputLabel error={!!error} className="mb-2">
        {label} <span className="c-red">{required ? "*" : ""}</span>
      </InputLabel>
      <OutlinedInput error={!!error} size="small" fullWidth {...textProps} />
      <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
    </>
  );
}
