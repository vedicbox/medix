import {
  Badge,
  ButtonBase,
  Collapse,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Iconify from "components/icons/Iconify";
import * as React from "react";
import { ICON_NAME } from "values/img-links";

// STYLED COMPONENTS
const NavExpandRoot = styled("div")(({ theme }) => ({
  "& .expandIcon": {
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)",
  },
  "& .collapseIcon": {
    transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)",
  },
}));

const BaseButton = styled(ButtonBase)(({ theme }) => ({
  height: 44,
  width: "100%",
  whiteSpace: "pre",
  overflow: "hidden",
  paddingRight: "16px",
  borderRadius: "4px",
  marginBottom: "8px",
  display: "flex",
  justifyContent: "space-between !important",
}));

export default function VerticalExpansionPanel({ navObj, children }) {
  const [collapsed, setCollapsed] = React.useState(false);

  const { name, icon, badge } = navObj;

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  //  <IconObject fontSize="small" sx={{ color: "text.secondary",}} />

  return (
    <NavExpandRoot>
      <BaseButton
        sx={{ width: "100%", py: 2, pl: 1 }}
        onClick={handleToggle}
      >
        <Stack direction="row" justifyContent="start" alignItems="center">
          <Iconify icon={icon} />

          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "text.secondary",
              fontWeight: 500,
              paddingLeft: "0.8rem",
              verticalAlign: "middle",
            }}
          >
            {name}
          </Typography>
        </Stack>

        {badge && (
          <Badge sx={{ ml: 3 }} badgeContent={badge.value} color="primary" />
        )}

        <div className={collapsed ? "collapseIcon" : "expandIcon"}>
          <Iconify icon={ICON_NAME.ANGLE_RIGHT} />
        </div>
      </BaseButton>
      <Collapse
        in={collapsed}
        sx={{ transformOrigin: "0 0 0" }}
        {...(collapsed ? { timeout: 1000 } : {})}
      >
        {children}
      </Collapse>
    </NavExpandRoot>
  );
}
