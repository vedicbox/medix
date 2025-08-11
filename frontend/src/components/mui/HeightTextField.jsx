import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

export default function HeightTextField(props) {
  const { ftVal, inchVal, helperText, error, handleProcessObj } = props;

  const onChange = (e) => {
    const { name, value } = e.target;
    handleProcessObj({ [name]: value });
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <div style={{ width: "100%" }}>
          <InputLabel className="mb-2" error={!!error}>
            Feet <span className="c-red">*</span>
          </InputLabel>
          <Select
            value={ftVal || ""}
            onChange={onChange}
            fullWidth
            size="small"
            error={!!error}
            name="feet"
          >
            {[...Array(8).keys()].slice(1).map((ft) => (
              <MenuItem key={ft} value={ft}>
                {ft}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div style={{ width: "100%" }}>
          <InputLabel className="mb-2" error={!!error}>
            Inch <span className="c-red">*</span>
          </InputLabel>
          <Select
            value={inchVal || 0}
            onChange={onChange}
            fullWidth
            size="small"
            error={!!error}
            name="inch"
          >
            {[...Array(12).keys()].map((inch) => (
              <MenuItem key={inch} value={inch}>
                {inch}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Stack>
      <FormHelperText error={!!error}>
        {error ? error : helperText}
      </FormHelperText>
    </>
  );
}
