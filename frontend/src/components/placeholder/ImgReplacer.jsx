import { Box, CardMedia, Typography } from "@mui/material";

export default function ImgReplacer(props) {
  const {
    src,
    text,
    dimension = 80,
    minHeight = 150,
    heading,
    headingVariant = "h6",
    variant = "body1",
  } = props;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: minHeight,
        }}
      >
        <div className="text-center">
          <CardMedia
            className="mx-auto"
            sx={{ height: dimension, width: dimension }}
            image={src}
          />
          <Typography className="mt-3 text-muted" variant={headingVariant}>
            {heading}
          </Typography>
          <Typography className="mt-3 text-muted" variant={variant}>
            {text}
          </Typography>
        </div>
      </Box>
    </>
  );
}
