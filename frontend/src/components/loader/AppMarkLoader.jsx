import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import BrandWrapper from "components/company/BrandWrapper";

export default function AppMarkLoader() {
  return (
    <>
      <LinearProgress color="primary" />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BrandWrapper />
      </Box>
    </>
  );
}
