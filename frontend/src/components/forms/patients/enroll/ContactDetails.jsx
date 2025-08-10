import { Grid } from "@mui/material";
import FormHeading from "components/forms/element/FormHeading";
import MuiSelectField from "components/mui/MuiSelectField";
import MuiTextField from "components/mui/MuiTextField";
import { WHATSAPP_OPTIONS } from "list/optionsList";
import { ICON_NAME } from "values/img-links";

export default function PatientContactForm(props) {
  const { errors, processObj, handleProcessObj, onChange, onBlur } = props;

  return (
    <>
      <FormHeading title="Contact Details" icon={ICON_NAME.CONTACTS}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="mb-2">
              <MuiTextField
                label="Email Address"
                error={errors.email}
                textProps={{
                  name: "email",
                  onChange,
                  onBlur,
                  placeholder: "xyz@gmail.com",
                }}
              />
            </div>
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
        </Grid>
      </FormHeading>
    </>
  );
}
