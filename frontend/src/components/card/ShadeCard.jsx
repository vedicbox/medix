// material-ui
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Iconify from "components/icons/Iconify";
import { ICON_NAME } from "values/img-links";

export default function ShadeCard() {
  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "secondary.dark",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: (theme) => theme.palette.secondary.darker,
          borderRadius: "50%",
          top: { xs: -85 },
          right: { xs: -95 },
        },
        "&:before": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: (theme) => theme.palette.secondary.darker,
          borderRadius: "50%",
          top: { xs: -125 },
          right: { xs: -15 },
          opacity: 0.5,
        },
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column">
          <Grid>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "secondary.darker",
                    mt: 1,
                  }}
                >
                  <Iconify icon={ICON_NAME.MONEY_LINEAR} />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid>
                <Typography
                  sx={{
                    fontSize: "2.125rem",
                    fontWeight: 500,
                    mr: 1,
                    mt: 1.75,
                    mb: 0.75,
                  }}
                  className="c-white"
                >
                  $500.00
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ mb: 1.25 }}>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "secondary.lighter",
              }}
            >
              Total Earning
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
