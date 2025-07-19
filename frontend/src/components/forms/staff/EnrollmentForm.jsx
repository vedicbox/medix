import { Grid } from "@mui/material";
import CityAutoField from "components/autocomplete/CityAutoField";
import CountryAutoField from "components/autocomplete/CountryAutoField";
import StateAutoField from "components/autocomplete/StateAutoField";
import MuiDatePicker from "components/mui/MuiDateField";
import MuiSelectField from "components/mui/MuiSelectField";
import MuiTextField from "components/mui/MuiTextField";
import dayjs from "dayjs";
import { GENDER_OPTIONS, WHATSAPP_OPTIONS } from "list/optionsList";

export default function StaffEnrollmentForm(props) {
  const { errors, processObj, handleProcessObj, onChange, onBlur } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label="First Name"
            error={errors["firstName"]}
            textProps={{
              name: "firstName",
              onChange,
              onBlur,
              slotProps: { htmlInput: { maxLength: 45 } },
              placeholder: "Enter First Name",
            }}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label="Last Name"
            name="lastName"
            error={errors["lastName"]}
            textProps={{
              name: "lastName",
              onChange,
              onBlur,
              placeholder: "Enter Last Name",
              slotProps: { htmlInput: { maxLength: 45 } },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="mb-2">
            <MuiTextField
              error={errors.phone1}
              label="Phone No"
              textProps={{
                name: "phone1",
                onChange,
                onBlur,
                placeholder: "Enter Phone No",
                slotProps: { htmlInput: { maxLength: 10 } },
              }}
            />
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="mb-2">
            <MuiTextField
              label="Alternate Number"
              error={errors.phone2}
              required={false}
              textProps={{
                name: "phone2",
                onChange,
                onBlur,
                placeholder: "Enter Alternate Number",
                slotProps: { htmlInput: { maxLength: 10 } },
              }}
            />
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MuiSelectField
            label="Whatsapp No"
            name="whatsappPref"
            value={processObj["whatsappPref"]}
            error={errors["whatsappPref"]}
            options={WHATSAPP_OPTIONS}
            handleProcessObj={handleProcessObj}
          />
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label=" Email Address"
            error={errors["email"]}
            textProps={{
              name: "email",
              onChange,
              onBlur,
              placeholder: "xyz@gmail.com",
            }}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <MuiSelectField
            label="Gender"
            name="gender"
            value={processObj["gender"]}
            error={errors["gender"]}
            options={GENDER_OPTIONS}
            handleProcessObj={handleProcessObj}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <MuiDatePicker
            label="Date Of Birth"
            handleProcessObj={handleProcessObj}
            name="dob"
            value={processObj["dob"]}
            error={errors.dob}
            pickerProps={{
              disableFuture: true,
              shouldDisableDate: (day) => {
                return day.isSame(dayjs(), 'day');
              }
            }}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <CountryAutoField
            name="country"
            error={errors["country"]}
            selectedVal={processObj["country"]}
            onChange={handleProcessObj}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <StateAutoField
            name="state"
            error={errors["state"]}
            country={processObj["country"]}
            selectedVal={processObj["state"]}
            onChange={handleProcessObj}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <CityAutoField
            name="city"
            error={errors["city"]}
            state={processObj["state"]}
            country={processObj["country"]}
            selectedVal={processObj["city"]}
            onChange={handleProcessObj}
          />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <MuiTextField
            label="Pincode"
            error={errors["pincode"]}
            textProps={{
              name: "pincode",
              onChange,
              onBlur,
              slotProps: { htmlInput: { maxLength: 6, minLength: 6 } },
            }}
          />
        </Grid>
        <Grid size={12}>
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
        </Grid>
      </Grid>
    </>
  );
}
