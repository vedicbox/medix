import { Divider } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Iconify from "components/icons/Iconify";
import DisplayContent from "components/placeholder/DisplayContent";
import { useNavigate } from "react-router-dom";
import ValidPermission from "../placeholder/ValidPermission";

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

export default function AnchorMenu(props) {
  const { menuItems, topContent, sx, anchorEl, handleClose, menuProps } = props;

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleAction = ({ segment, handler }) => {
    if (segment) {
      navigate(segment?.pathname, { state: segment?.state });
    } else if (handler) {
      handler();
    }

    handleClose();
  };

  return (
    <>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ maxWidth: 360, ...sx }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        {...menuProps}
      >
        {topContent}
        {menuItems.map((itemObj, index) => {
          if (itemObj.hide) return null;

          if (itemObj.divider) return <Divider key={index} sx={{ my: 0.5 }} />;

          return (
            <ValidPermission key={itemObj.segment?.pathname} uuid={itemObj.uuid}>
              <MenuItem onClick={() => handleAction(itemObj)}>
                <DisplayContent valid1={itemObj.icon}>
                  <Iconify className="mr-3" icon={itemObj.icon} />
                </DisplayContent>
                {itemObj.title}
              </MenuItem>
            </ValidPermission>
          );
        })}
      </StyledMenu>
    </>
  );
}
