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
import { GetCity } from "react-country-state-city";

export default function CityAutoField(props) {
  const { state, country, error, onChange, selectedVal, name } = props;
  const [open, setOpen] = React.useState(false);
  const [cityList, setCityList] = React.useState([]);
  const loading = open && cityList.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active && state?.id) {
        GetCity(country.id, state.id).then((result) => {
          setCityList(result);
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setCityList([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    onChange({
      city: newValue,
    });
  };

  return (
    <>
      <InputLabel error={!!error} className="mb-2">
        City <span className="c-red">*</span>
      </InputLabel>
      <Autocomplete
        options={cityList}
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
              {option.name}
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
            placeholder="Select City"
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
      <FormHelperText error={!!error}>{error}</FormHelperText>
    </>
  );
}
