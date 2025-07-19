/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "@emotion/styled";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Iconify from "components/icons/Iconify";
import { NavLink } from "react-router-dom";

const StyledBreadcrumb = styled(Box)(({ theme }) => ({
  height: theme.spacing(3),
  cursor: "pointer",
  "&:hover, &:focus": {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
  display: "flex",
  alignItems: "center",
  fontSize: theme.typography.pxToRem(14),
}));

export default function CollapsedBreadcrumbs({ breadlist, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction="row"
      spacing={isMobile ? 2 : 0}
      alignItems="center"
      justifyContent="space-between"
      className="mb-4"
    >
      <div role="presentation" className="mr-auto">
        <Breadcrumbs
          maxItems={isMobile ? 1 : 2}
          aria-label="breadcrumb"
          sx={{ fontSize: isMobile ? 12 : 15 }}
        >
          {breadlist.map((itemObj) => (
            <StyledBreadcrumb
              key={itemObj.label}
              component={itemObj.link ? NavLink : undefined}
              underline="hover"
              color="inherit"
              to={itemObj.link}
            >
              <Iconify icon={itemObj.icon} sx={{ mr: 1 }} /> {itemObj.label}
            </StyledBreadcrumb>
          ))}
        </Breadcrumbs>
      </div>
      <div className="ml-auto">{children}</div>
    </Stack>
  );
}
