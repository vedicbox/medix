import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { env_props } from "env";

export default function AppMarkLoader() {
  return (
    <>
      <LinearProgress color="primary" />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" color="primary" className="f-w-600">
            {env_props.APP_NAME}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
