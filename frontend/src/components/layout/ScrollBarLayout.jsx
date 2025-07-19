import PropTypes from "prop-types";
import { memo } from "react";
// @mui
import { Box } from "@mui/material";
//
import SimpleBar from "simplebar-react";
// @mui
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const StyledRootScrollbar = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  padding: "10px",
}));

// ----------------------------------------------------------------------

ScrollBarLayout.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

function ScrollBarLayout({ children, sx, ...other }) {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(ScrollBarLayout);
