import { Box, Divider } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Iconify from "components/icons/Iconify";
import DisplayContent from "components/placeholder/DisplayContent";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function ClassicMenu(props) {
  const { menulist, topContent, children, sx } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (itemObj) => {
    if (itemObj.link) {
      navigate(itemObj.link?.pathname, { state: itemObj.link?.state });
    } else if (itemObj.handler) {
      itemObj.handler();
    }

    handleClose();
  };

  return (
    <>
      <Box
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
      >
        {children}
      </Box>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ maxWidth: 360, ...sx }}
      >
        {topContent}
        {menulist.map((itemObj, index) => {
          if (itemObj.hide) return null;

          if (itemObj.divider) return <Divider key={index} sx={{ my: 0.5 }} />;

          return (
            <MenuItem
              key={index}
              onClick={() => handleAction(itemObj)}
              component={itemObj.link ? NavLink : undefined}
              to={itemObj.link}
            >
              <DisplayContent valid1={itemObj.icon}>
                <Iconify className="mr-3" icon={itemObj.icon} />
              </DisplayContent>
              {itemObj.label}
            </MenuItem>
          );
        })}
      </StyledMenu>
    </>
  );
}
