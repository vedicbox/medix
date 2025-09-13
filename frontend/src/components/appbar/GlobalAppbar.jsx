import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import BrandWrapper from "components/company/BrandWrapper";
import Iconify from "components/icons/Iconify";
import DisplayContent from "components/placeholder/DisplayContent";
import HeaderProfilePopover from "components/popover/AccountPopover";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavDrawer_slice } from "store/root-reducer/global";
import { ICON_NAME } from "values/img-links";

export default function GlobalAppbar(props) {
  const { drawerStat = true } = props;
  const dispatch = useDispatch();
  const navDrawerStat = useSelector((state) => state.global.navDrawerStat);

  const toggleNavBar = () => {
    dispatch(toggleNavDrawer_slice(!navDrawerStat));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        className="br-bottom"
      >
        <Toolbar>
          <DisplayContent valid1={drawerStat}>
            <IconButton onClick={toggleNavBar}>
              <Iconify
                icon={
                  navDrawerStat
                    ? ICON_NAME.HUMBURGER_OPEN
                    : ICON_NAME.HUMBURGER_CLOSE
                }
              />
            </IconButton>
          </DisplayContent>

          <BrandWrapper logoHeight={50} />
          <Box sx={{ flexGrow: 1 }} />

          <HeaderProfilePopover />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
