import {
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import Iconify from "components/icons/Iconify";
import MuiSelectField from "components/mui/MuiSelectField";
import MuiTextField from "components/mui/MuiTextField";
import { WHATSAPP_OPTIONS } from "list/optionsList";
import { ICON_NAME } from "values/img-links";

export default function PatientContactForm(props) {
  const { errors, processObj, handleProcessObj, onChange, onBlur } = props;

  const handleStateChange = (name, value) => {
    handleProcessObj({ [name]: value });
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
        <Iconify icon={ICON_NAME.CONTACTS} />
        <Typography className="f-w-600 text-muted ml-2 f-italic">
          Contact Details
        </Typography>
      </Stack>

      <Paper className="p-4 mb-3">
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
      </Paper>
    </>
  );
}
