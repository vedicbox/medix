import { Grid } from "@mui/material";
import CityAutoField from "components/autocomplete/CityAutoField";
import CountryAutoField from "components/autocomplete/CountryAutoField";
import StateAutoField from "components/autocomplete/StateAutoField";
import FormHeading from "components/forms/element/FormHeading";
import MuiTextField from "components/mui/MuiTextField";
import { ICON_NAME } from "values/img-links";

export default function PatientAddressForm(props) {
  const { errors, processObj, handleProcessObj, onChange, onBlur } = props;

  return (
    <>
      <FormHeading title="Address Information" icon={ICON_NAME.ADDRESS_BOOK}>
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
      </FormHeading>
    </>
  );
}
