import {
  Paper,
  Stack,
  Typography
} from "@mui/material";
import Iconify from "components/icons/Iconify";
import MuiAutoComplete from "components/mui/MuiAutoComplete";
import { useEffect } from "react";
import { useFetchRoleNamesQuery } from "service/auth/roleService";
import { useFetchClinicNamesQuery } from "service/clinicService";
import { ICON_NAME } from "values/img-links";


export default function EntityAssignForm(props) {
  const { errors, handleProcessObj, role } = props;

  const { data: roleData } = useFetchRoleNamesQuery();
  const { data: clinicData } = useFetchClinicNamesQuery();

  let roles = roleData?.payload || [];
  let clinics = clinicData?.payload || [];

  useEffect(() => {
    if (typeof role == "string") {
      let roleObj = roles.find((el) => el._id == role);
      if (roleObj) handleProcessObj({ roleRef: roleObj });
    }
  }, [roleData]);

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
            options={roles}
            handleProcessObj={handleProcessObj}
            value={role || ""}
            placeholder="Select Role"
            autoProps={{
              getOptionLabel: (option) => option.name || "",
            }}
          />
        </div>
        <div className="mb-4">
          <MuiAutoComplete
            name="roleRef"
            label="Assign Clinic"
            error={errors.clinicRef}
            options={clinics}
            handleProcessObj={handleProcessObj}
            value={role || ""}
            placeholder="Select Clinic"
            autoProps={{
              getOptionLabel: (option) => option.name || "",
            }}
          />
        </div>
      </Paper>
    </>
  );
}
