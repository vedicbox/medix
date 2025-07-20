import { Grid, Paper, Stack, Typography } from "@mui/material";
import CityAutoField from "components/autocomplete/CityAutoField";
import CountryAutoField from "components/autocomplete/CountryAutoField";
import StateAutoField from "components/autocomplete/StateAutoField";
import Iconify from "components/icons/Iconify";
import MuiTextField from "components/mui/MuiTextField";
import { ICON_NAME } from "values/img-links";

export default function PatientAddressForm(props) {
  const { errors, processObj, handleProcessObj, onChange, onBlur } = props;

  const handleMultipleUpdate = (obj, name, value) => {
    handleProcessObj(obj);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          bgcolor: (theme) => theme.palette.primary[50],
          p: "10px",
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 10,
          mb: "5px",
          border: "1px solid #ccc",
        }}
      >
        <Iconify icon={ICON_NAME.ADDRESS_BOOK} />
        <Typography className="f-w-600 text-muted ml-2 f-italic">
          Address Information
        </Typography>
      </Stack>

      <Paper className="p-4 mb-3">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CountryAutoField
              name="country"
              error={errors["country"]}
              selectedVal={processObj["country"]}
              onChange={handleProcessObj}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <StateAutoField
              name="state"
              error={errors["state"]}
              country={processObj["country"]}
              selectedVal={processObj["state"]}
              onChange={handleProcessObj}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CityAutoField
              name="city"
              error={errors["city"]}
              state={processObj["state"]}
              country={processObj["country"]}
              selectedVal={processObj["city"]}
              onChange={handleProcessObj}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="mb-2">
              <MuiTextField
                label="Pincode"
                error={errors["pincode"]}
                textProps={{
                  name: "pincode",
                  placeholder: "Enter Pincode",
                  slotProps: { htmlInput: { maxLength: 6 } },
                  onChange,
                  onBlur,
                }}
              />
            </div>
          </Grid>
          <Grid size={12}>
            <div className="mb-2">
              <MuiTextField
                label="Address 1"
                error={errors.addr1}
                textProps={{
                  name: "addr1",
                  multiline: true,
                  rows: 2,
                  slotProps: { htmlInput: { maxLength: 100 } },
                  onChange,
                  onBlur,
                }}
              />
            </div>
          </Grid>
          <Grid size={12}>
            <div className="mb-2">
              <MuiTextField
                label="Address 2"
                required={false}
                error={errors.addr2}
                textProps={{
                  name: "addr2",
                  multiline: true,
                  rows: 2,
                  slotProps: { htmlInput: { maxLength: 100 } },
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
