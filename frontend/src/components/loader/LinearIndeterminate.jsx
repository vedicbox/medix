import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearIndeterminate() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        zIndex: (theme) => theme.zIndex.appBar + 999,
        "& > * + *": {
          marginTop: (theme) => theme.spacing(2),
        },
      }}
    >
      <LinearProgress color="primary" />
      <div className="overlay" />
    </Box>
  );
}
