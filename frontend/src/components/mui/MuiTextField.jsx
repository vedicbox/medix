import { FormHelperText, InputLabel, TextField } from "@mui/material";

export default function MuiTextField(props) {
  const { label, error, helperText, required = true, textProps } = props;
  return (
    <>
      <InputLabel error={!!error} className="mb-2">
        {label} <span className="c-red">{required ? "*" : ""}</span>
      </InputLabel>
      <TextField size="small" error={!!error} fullWidth {...textProps} />
      <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
    </>
  );
}
