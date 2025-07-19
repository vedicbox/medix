import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import BrandWrapper from "components/company/BrandWrapper";
import Iconify from "components/icons/Iconify";
import HeaderProfilePopover from "components/popover/AccountPopover";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavDrawer_slice } from "store/root-reducer/global";

export default function GlobalAppbar() {
  const dispatch = useDispatch();
  const navDrawerStat = useSelector((state) => state.global.navDrawerStat);

  const toggleNavBar = () => {
    dispatch(toggleNavDrawer_slice());
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
          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
            }}
            onClick={toggleNavBar}
          >
            <Iconify
              icon={navDrawerStat ? "mdi:hamburger-open" : "charm:menu-hamburger"}
            />
          </IconButton>

          <BrandWrapper />
          <Box sx={{ flexGrow: 1 }} />

          <HeaderProfilePopover />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
