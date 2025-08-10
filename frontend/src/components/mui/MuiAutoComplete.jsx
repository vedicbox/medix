import { FormHelperText, InputLabel } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const MuiAutoComplete = ({
  error,
  options = [],
  placeholder,
  helperText,
  label,
  required = true,
  handleProcessObj,
  value,
  autoProps = {},
  name,
}) => {
  const onChange = useCallback(
    (_, newVal) => {
      handleProcessObj({ [name]: newVal });
    },
    [handleProcessObj, name]
  );

  return (
    <div className="mui-autocomplete-wrapper">
      {label && (
        <InputLabel error={!!error} className="mb-2">
          {label}
          {required && <span className="c-red">*</span>}
        </InputLabel>
      )}

      <Autocomplete
        options={options}
        size="small"
        freeSolo
        onChange={onChange}
        value={value}
        {...autoProps}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            helperText={helperText}
            error={!!error}
            fullWidth
          />
        )}
      />

      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
};

MuiAutoComplete.propTypes = {
  error: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  handleProcessObj: PropTypes.func.isRequired,
  value: PropTypes.any,
  autoProps: PropTypes.object,
  name: PropTypes.string.isRequired,
};

export default MuiAutoComplete;
