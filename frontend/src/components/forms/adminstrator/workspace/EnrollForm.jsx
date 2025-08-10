import { Avatar, Grid } from "@mui/material";
import FormHeading from "components/forms/element/FormHeading";
import MuiMultiSelectField from "components/mui/MuiMultiSelect";
import MuiSelectField from "components/mui/MuiSelectField";
import MuiTextField from "components/mui/MuiTextField";
import { PROJ_CATEGORY, STATUS_OPTIONS } from "list/optionsList";

export default function WorkspaceEnrollForm(props) {
  const { errors, processObj, handleProcessObj, onChange, onBlur } = props;

  return (
    <>
      <FormHeading title="Detail Info" icon="devicon:detaspace">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <div className="text-center">
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                }}
              />
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <div className="mb-4">
              <MuiTextField
                label="Organization Name"
                error={errors["orgName"]}
                textProps={{
                  name: "orgName",
                  onChange,
                  onBlur,
                  slotProps: { htmlInput: { maxLength: 45 } },
                  placeholder: "Enter Organization Name",
                }}
              />
            </div>
            <div className="mb-4">
              <MuiTextField
                label="Org Code"
                name="orgCode"
                error={errors["orgCode"]}
                textProps={{
                  name: "orgCode",
                  onChange,
                  onBlur,
                  placeholder: "Enter OrgCode Name",
                  slotProps: { htmlInput: { maxLength: 45 } },
                }}
              />
            </div>
          </Grid>
        </Grid>
      </FormHeading>

      <FormHeading title="Detail Info" icon="logos:jetbrains-space-icon">
        <div className="mb-4">
          <MuiSelectField
            label="Category"
            name="category"
            value={processObj.category}
            options={PROJ_CATEGORY}
            handleProcessObj={handleProcessObj}
            error={errors["category"]}
          />
        </div>

        <div className="mt-2">
          <MuiSelectField
            label="Status"
            name="status"
            value={processObj.status}
            options={STATUS_OPTIONS}
            handleProcessObj={handleProcessObj}
            error={errors["status"]}
          />
        </div>
      </FormHeading>
    </>
  );
}
