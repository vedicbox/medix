import {
  Autocomplete,
  Box,
  Chip,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { GetState } from "react-country-state-city";
import { HELPER_TXT_MSG } from "values/messages";

export default function StateAutoField(props) {
  const { country, error, onChange, selectedVal, name } = props;
  const [open, setOpen] = React.useState(false);
  const [stateList, setStateList] = React.useState([]);
  const loading = open && stateList.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active && country?.id) {
        GetState(country?.id).then((result) => {
          setStateList(result);
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setStateList([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    onChange(
      {
        state: newValue,
        city: null,
      },
      name,
      newValue
    );
  };

  return (
    <>
      <InputLabel error={!!error} className="mb-2">
        State <span className="c-red">*</span>
      </InputLabel>
      <Autocomplete
        options={stateList}
        size="small"
        loading={loading}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={selectedVal?.id ? selectedVal : null}
        onChange={handleChange}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              {option.name} ({option.state_code})
            </Box>
          );
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              size="small"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            error={!!error}
            placeholder="Select State"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              },
            }}
          />
        )}
      />
      <FormHelperText error={!!error}>
        {error}
      </FormHelperText>
    </>
  );
}
