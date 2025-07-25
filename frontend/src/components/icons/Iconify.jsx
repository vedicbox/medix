import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

const Iconify = forwardRef(
  ({ icon, width = 20, className, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className={`component-iconify ${className}`}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  width: PropTypes.number,
};

export default Iconify;
