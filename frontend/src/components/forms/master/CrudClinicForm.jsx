import { Grid, Paper } from "@mui/material";
import CityAutoField from "components/autocomplete/CityAutoField";
import CountryAutoField from "components/autocomplete/CountryAutoField";
import StateAutoField from "components/autocomplete/StateAutoField";
import MuiTextField from "components/mui/MuiTextField";
import MuiTimePicker from "components/mui/MuiTimePicker";
import SelectedWeekField from "components/mui/SelectedWeekField";
import FormHeading from "../element/FormHeading";

export default function CrudClinicForm(props) {
  const { processObj, handleProcessObj, onChange, onBlur, errors } = props;

  return (
    <>
      <FormHeading title="Personal Details" icon="fluent-emoji:information" />

      <Paper className="p-4 mb-3">
        <Grid container spacing={3}>
          <Grid size={6}>
            <MuiTextField
              label="Clinic Name"
              name="name"
              error={errors["name"]}
              textProps={{
                name: "name",
                placeholder: "Abc Clinic",
                onChange,
                onBlur,
              }}
            />
          </Grid>
          <Grid size={6}>
            <MuiTextField
              label="GST No."
              error={errors["gstNo"]}
              textProps={{
                name: "gstNo",
                placeholder: "XXXXX",
                onChange,
                onBlur,
              }}
            />
          </Grid>
          <Grid size={12}>
            <MuiTextField
              label="Description"
              name="shortDesc"
              error={errors["shortDesc"]}
              textProps={{
                name: "shortDesc",
                rows: 2,
                multiline: true,
                onChange,
                onBlur,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <FormHeading
        title=" Contact Details"
        icon="flat-color-icons:business-contact"
      />

      <Paper className="p-4 mb-3">
        <Grid container spacing={3}>
          <Grid size={12}>
            <MuiTextField
              label="Clinic Email"
              error={errors["email"]}
              textProps={{
                name: "email",
                placeholder: "clinic@gmail.com",
                onChange,
                onBlur,
              }}
            />
          </Grid>
          <Grid size={6}>
            <MuiTextField
              label="Phone No"
              error={errors["phone1"]}
              textProps={{
                name: "phone1",
                placeholder: "999999999",
                onChange,
                onBlur,
              }}
            />
          </Grid>
          <Grid size={6}>
            <MuiTextField
              label="Alternate No"
              error={errors["phone2"]}
              required={false}
              textProps={{
                name: "phone2",
                placeholder: "999999999",
                onChange,
                onBlur,
              }}
            />
          </Grid>
          <Grid size={6}>
            <CountryAutoField
              name="country"
              error={errors["country"]}
              selectedVal={processObj["country"]}
              onChange={handleProcessObj}
            />
          </Grid>
          <Grid size={6}>
            <StateAutoField
              name="state"
              error={errors["state"]}
              country={processObj["country"]}
              selectedVal={processObj["state"]}
              onChange={handleProcessObj}
            />
          </Grid>
          <Grid size={6}>
            <CityAutoField
              name="city"
              error={errors["city"]}
              state={processObj["state"]}
              country={processObj["country"]}
              selectedVal={processObj["city"]}
              onChange={handleProcessObj}
            />
          </Grid>
          <Grid size={6}>
            <div>
              <MuiTextField
                label="Pincode"
                error={errors["pincode"]}
                textProps={{
                  name: "pincode",
                  onChange,
                  onBlur,
                }}
              />
            </div>
          </Grid>
          <Grid size={12}>
            <div>
              <MuiTextField
                label="Address"
                error={errors["address"]}
                textProps={{
                  name: "address",
                  rows: 2,
                  multiline: true,
                  onChange,
                  onBlur,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>

      <FormHeading title="Timing Details" icon="openmoji:timer" />

      <Paper className="p-4 mb-3">
        <Grid container spacing={2}>
          <Grid size={6}>
            <div>
              <MuiTimePicker
                label="Shift From"
                value={processObj["shiftFrom"]}
                handleProcessObj={handleProcessObj}
                name="shiftFrom"
                error={errors["shiftFrom"]}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <MuiTimePicker
                label="Shift To"
                value={processObj["shiftTo"]}
                handleProcessObj={handleProcessObj}
                name="shiftTo"
                error={errors["shiftTo"]}
              />
            </div>
          </Grid>

          <Grid size={12}>
            <div>
              <SelectedWeekField
                weeks={processObj["weekOff"]}
                handleProcessObj={handleProcessObj}
                error={errors["weekOff"]}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
