import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BrandWrapper from "components/company/BrandWrapper";
import { PLACEHOLDER_IMG } from "values/img-links";

export default function AuthWrapper({ children }) {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left side - Form content */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ bgcolor: "background.paper" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            p: 3,
          }}
        >
          {children}
        </Box>
      </Grid>

      {/* Right side - Image (hidden on mobile) */}
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            p: 2,
          }}
        >
          <div className="text-center">
            <BrandWrapper textProps={{ fontSize: 28 }} />
            <Box
              component="img"
              alt="Authentication Illustration"
              src={PLACEHOLDER_IMG.AUTH_WIDGETS}
              sx={{
                height: "auto",
                width: "100%",
                maxWidth: "600px",
                objectFit: "contain",
              }}
            />
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
