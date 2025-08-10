import { Grid } from "@mui/material";
import FormHeading from "components/forms/element/FormHeading";
import HeightTextField from "components/mui/HeightTextField";
import MuiDatePicker from "components/mui/MuiDateField";
import MuiSelectField from "components/mui/MuiSelectField";
import MuiTextField from "components/mui/MuiTextField";
import dayjs from "dayjs";
import { GENDER_OPTIONS, MARTIAL_OPTIONS } from "list/optionsList";
import { ICON_NAME } from "values/img-links";

function PatientDetailsForm(props) {
  const { errors, processObj, handleProcessObj, onChange, onBlur } = props;

  const handleStateChange = (name, value) => {
    handleProcessObj({ [name]: value });
  };

  return (
    <>
      <FormHeading title="Personal Details" icon={ICON_NAME.INFORMATION}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="mb-2">
              <MuiTextField
                label="First Name"
                error={errors.firstName}
                textProps={{
                  name: "firstName",
                  onChange,
                  onBlur,
                  placeholder: "Enter First name",
                  slotProps: { htmlInput: { maxLength: 45 } },
                }}
              />
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="mb-2">
              <MuiTextField
                label="Last Name"
                error={errors.lastName}
                textProps={{
                  name: "lastName",
                  onChange,
                  onBlur,
                  placeholder: "Enter Last name",
                  slotProps: { htmlInput: { maxLength: 45 } },
                }}
              />
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="mb-2">
              <MuiDatePicker
                label="Date Of Birth"
                handleProcessObj={handleProcessObj}
                name="dob"
                value={processObj["dob"]}
                error={errors.dob}
                pickerProps={{
                  disableFuture: true,
                  shouldDisableDate: (day) => {
                    return day.isSame(dayjs(), "day");
                  },
                }}
              />
            </div>
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
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="mb-2">
              <HeightTextField
                error={errors.feet}
                ftVal={processObj.feet}
                inchVal={processObj.inch}
                handleProcessObj={handleProcessObj}
              />
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="mb-2">
              <MuiTextField
                label="Weight"
                error={errors.weight}
                textProps={{
                  name: "weight",
                  placeholder: "Enter weight",
                  onChange,
                  onBlur,
                  slotProps: { htmlInput: { maxLength: 3 } },
                }}
              />
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div className="mb-2">
              <MuiTextField
                label="Age"
                error={errors.age}
                textProps={{
                  name: "age",
                  placeholder: "Enter Age",
                  onChange,
                  onBlur,
                  slotProps: { htmlInput: { maxLength: 3 } },
                }}
              />
            </div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MuiSelectField
              label="Martial Status"
              name="martial"
              value={processObj["martial"]}
              error={errors["martial"]}
              options={MARTIAL_OPTIONS}
              handleProcessObj={handleProcessObj}
            />
          </Grid>
        </Grid>
      </FormHeading>
    </>
  );
}

export default PatientDetailsForm;
