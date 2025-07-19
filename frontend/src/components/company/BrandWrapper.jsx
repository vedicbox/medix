import { Box, Typography } from "@mui/material";

import { env_props } from "env";

export default function BrandWrapper(props) {
  const { textProps } = props;
  return (
    <Box>
      <Typography color="primary" sx={{ fontWeight: "bold", ...textProps }}>
        {env_props.APP_NAME}
      </Typography>
    </Box>
  );
}
