import {
  Badge,
  Box,
  ButtonBase,
  Divider,
  styled,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import VerticalExpansionPanel from "components/accordion/VerticalExpansionPanel";
import Iconify from "components/icons/Iconify";
import { NavLink } from "react-router-dom";

const InternalLink = styled(Box)(({ theme }) => ({
  "& a": {
    display: "flex",
    overflow: "hidden",
    borderRadius: "4px",
    height: 44,
    marginBottom: "8px",
    textDecoration: "none",
    justifyContent: "space-between",
    transition: "all 150ms ease-in",
    "&:hover": {
      background: theme.palette.primary[50],
    },
    "& .icon": {
      fontSize: "18px",
      verticalAlign: "middle",
      color: grey[600],
    },
  },
  "& .navItemActive": {
    backgroundColor: theme.palette.primary[100],
    "& .icon": {
      color: theme.palette.primary.dark,
    },
    "& .navtitle": {
      color: theme.palette.primary.dark,
      fontWeight: 600,
    },
  },
}));

const NavItem = ({ navObj }) => {
  const renderItem = (item, isSubChild) => {
    const { icon } = item;

    if (item.type === "label") {
      return (
        <Divider textAlign="left" className="mb-3">
          <span className="f-s-12 my-2 mx-2 text-muted text-upper">
            {item.label}
          </span>
        </Divider>
      );
    }

    if (item.children) {
      return (
        <VerticalExpansionPanel navObj={item}>
          {item.children.map((subItem, subIndex) => (
            <div key={subIndex}>{renderItem(subItem, true)}</div>
          ))}
        </VerticalExpansionPanel>
      );
    }

    return (
      <InternalLink>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            (item.index && window.location.pathname === item.path) ||
            (!item.index && isActive)
              ? "navItemActive"
              : ""
          }
        >
          <ButtonBase sx={{ width: "100%", py: 2, pl: isSubChild ? 3 : 1 }}>
            <Iconify icon={icon} className="icon" />
            <Typography
              className="navtitle"
              sx={{
                fontSize: "0.875rem",
                paddingLeft: "0.8rem",
                mr: "auto",
                color: "text.disabled",
                fontWeight: 500,
              }}
            >
              {item.name}
            </Typography>
            {item.badge && (
              <Badge badgeContent={item.badge.value} color="primary" />
            )}
          </ButtonBase>
        </NavLink>
      </InternalLink>
    );
  };

  return <div>{renderItem(navObj)}</div>;
};

export default NavItem;
