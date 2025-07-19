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
import { GetCountries } from "react-country-state-city";

export default function CountryAutoField(props) {
  const { error, name, onChange, selectedVal } = props;
  const [open, setOpen] = React.useState(false);
  const [countriesList, setCountriesList] = React.useState([]);
  const [initloading, setInitLoading] = React.useState(true);
  const loading = open && countriesList.length === 0;

  React.useEffect(() => {
    if (!selectedVal?.id && selectedVal?.trim()) {
      GetCountries().then((result) => {
        let selectedObj = result.find((v) => v.name == selectedVal);
        onChange(selectedObj);
        setInitLoading(false);
      });
    } else {
      setInitLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        GetCountries().then((result) => {
          setCountriesList(result);
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setCountriesList([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    onChange({
      country: newValue,
      state: null,
      city: null,
    });
  };

  return (
    <>
      <InputLabel error={!!error} className="mb-2">
        Country <span className="c-red">*</span>
      </InputLabel>
      <Autocomplete
        options={countriesList}
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
              <span className="mr-2">{option.emoji}</span>
              {option.name} ({option.iso2}) +{option.phone_code}
            </Box>
          );
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option}
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
            error={!!error}
            name={name}
            placeholder="Select Country"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading || initloading ? (
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
