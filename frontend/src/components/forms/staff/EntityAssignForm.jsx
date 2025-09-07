import { Paper, Stack, Typography } from "@mui/material";
import Iconify from "components/icons/Iconify";
import MuiAutoComplete from "components/mui/MuiAutoComplete";
import { ICON_NAME } from "values/img-links";

export default function EntityAssignForm(props) {
  const { errors, handleProcessObj, processObj, roleslist, cliniclist , specslist } = props;
  const { roleRef, clinicRef , specsRef } = processObj;

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
          Assign Entity
        </Typography>
      </Stack>
      <Paper sx={{ p: { md: 5, xs: 3 }, pt: 3 }}>
        <div className="mb-4">
          <MuiAutoComplete
            name="roleRef"
            label="Assign Role"
            error={errors.roleRef}
            options={roleslist}
            handleProcessObj={handleProcessObj}
            value={roleRef || ""}
            placeholder="Select Role"
            autoProps={{
              getOptionLabel: (option) => option.name || "",
            }}
          />
        </div>
        <div className="mb-4">
          <MuiAutoComplete
            name="clinicRef"
            label="Assign Clinic"
            error={errors.clinicRef}
            options={cliniclist}
            handleProcessObj={handleProcessObj}
            value={clinicRef || ""}
            placeholder="Select Clinic"
            autoProps={{
              getOptionLabel: (option) => option.name || "",
            }}
          />
        </div>
        <div className="mb-4">
          <MuiAutoComplete
            name="specsRef"
            label="Assign Specialization"
            error={errors.specsRef}
            options={specslist}
            handleProcessObj={handleProcessObj}
            value={specsRef || ""}
            placeholder="Select Specialization"
            autoProps={{
              getOptionLabel: (option) => option.name || "",
            }}
          />
        </div>
      </Paper>
    </>
  );
}
