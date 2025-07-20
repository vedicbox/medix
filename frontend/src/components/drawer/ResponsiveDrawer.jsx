import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { env } from "env";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavDrawer_slice } from "store/root-reducer/global";
import NavContainer from "./navContainer";

const drawerWidth = 250;

function ResponsiveDrawer(props) {
  const { window, navlist, children, profileObj = {} } = props;
  const navDrawerStat = useSelector((state) => state.global.navDrawerStat);
  const dispatch = useDispatch();

  const toggleNavBar = () => {
    dispatch(toggleNavDrawer_slice());
  };

  const handleDrawerClose = () => {
    toggleNavBar();
  };

  const drawer = (
    <>
      <Box sx={{ height: 60 }} />
      <Divider className="mb-2" />

      <NavContainer navlist={navlist} />
      <div className=" mt-auto">
        <Divider />
        <p className="py-1 f-s-13 text-center">
          © Copyrights {env.APP_NAME} 2025.
        </p>
      </div>
    </>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{
          display: { xs: "none", md: "block" },
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={navDrawerStat}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
