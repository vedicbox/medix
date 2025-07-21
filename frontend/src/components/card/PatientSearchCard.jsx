import { Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Iconify from "components/icons/Iconify";
import { NavLink } from "react-router-dom";
import { PARAMS_ROUTE, PATIENT_ROUTE } from "routes/routeurl";
import { GENDER_PARSER } from "values/enum";
import { AVATAR_IMG, ICON_NAME } from "values/img-links";

export default function PatientSearchCard({ itemObj }) {

  return <Paper className="px-3 py-3 elevation1" >
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid size={{ xs: 1 }} >
        <Avatar
          src={GENDER_PARSER[itemObj.gender]?.src || AVATAR_IMG.OTHER}
          sx={{ width: 50, height: 50 }}
        />
      </Grid>
      <Grid size={{ xs: 8 }}>
        <Typography variant="subtitle1">
          {itemObj.patientName}
        </Typography>

        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          className="mt-2"
        >
          <span className="d-flex align-items-center">
            <Iconify icon={ICON_NAME.GENDER} />
            <Typography className="ml-2 f-w-600" variant="body2">
              {GENDER_PARSER[itemObj.gender]?.value}</Typography>
          </span>

          <span className="d-flex align-items-center">
            <Iconify icon={ICON_NAME.AGENTS} />
            <Typography className="ml-2 f-w-600" variant="body2">{itemObj.age}</Typography>
          </span>
        </Stack>

      </Grid>
      <Grid item size={{ xs: 1 }} >
        <IconButton
          component={NavLink}
          to={`/${PARAMS_ROUTE.PATIENT}/${itemObj.caseId}/${PATIENT_ROUTE.CONSULT}`}
          edge="end"
          aria-label="comments"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <Iconify icon={ICON_NAME.LINK_OUT} />
        </IconButton>
      </Grid>
    </Grid>
  </Paper >

}
