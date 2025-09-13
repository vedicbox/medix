import {
  Box,
  Divider,
  Drawer,
  List,
  MenuItem,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleNavDrawer_slice } from "store/root-reducer/global";
import AnchorMenu from "../menu/AnchorMenu";
import ValidPermission from "../placeholder/ValidPermission";
import NavigationItem from "./nav/NavigationItem";

// Styled components
const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  minHeight: "64px !important",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const MainContent = styled("main", {
  shouldForwardProp: (prop) =>
    prop !== "drawerWidth" && prop !== "drawerCollapsed",
})(({ theme, drawerWidth, drawerCollapsed }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(100% - ${drawerCollapsed ? theme.spacing(9) : drawerWidth}px)`,
  minHeight: "100vh",
  overflowX: "auto",
  padding: 10,
}));

// Custom hook for navigation logic
const useNavigation = (isMobile, toggleNavBar) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      toggleNavBar(false);
    }
  };

  return { handleNavigate };
};

// DrawerContent component
const DrawerContent = ({
  navlist,
  drawerCollapsed,
  expandedItems,
  onToggleExpand,
  currentPath,
  onNavigate,
  onMenuOpen,
  menuAnchorEl,
  menuItems,
  menuTitle,
  onMenuClose,
  theme,
}) => (
  <Box
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      bgcolor: "background.paper",
      position: "relative",
    }}
  >
    <DrawerHeader />
    <Divider />
    <Box sx={{ flexGrow: 1, overflow: "auto", py: 1 }}>
      <List>
        {navlist.map((item, index) => (
          <ValidPermission key={item.uuid || index} uuid={item.uuid}>
            <NavigationItem
              item={item}
              drawerCollapsed={drawerCollapsed}
              expandedItems={expandedItems}
              onToggleExpand={onToggleExpand}
              currentPath={currentPath}
              onNavigate={onNavigate}
              onMenuOpen={onMenuOpen}
            />
          </ValidPermission>
        ))}
      </List>
    </Box>
    <AnchorMenu
      anchorEl={menuAnchorEl}
      menuItems={menuItems}
      handleClose={onMenuClose}
      topContent={
        <MenuItem
          disabled
          sx={{
            opacity: 1,
            color: "text.primary",
            fontWeight: 600,
            fontSize: "0.875rem",
            py: 1,
            borderBottom: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {menuTitle}
        </MenuItem>
      }
    />
  </Box>
);

// Main Dashboard Component
export default function DashboardLayout(props) {
  const { navlist, children } = props;
  const navDrawerStat = useSelector((state) => state.global.navDrawerStat);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleNavBar = (status) => {
    dispatch(toggleNavDrawer_slice(status));
  };

  const { handleNavigate } = useNavigation(isMobile, toggleNavBar);

  const [expandedItems, setExpandedItems] = useState({});
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [menuTitle, setMenuTitle] = useState("");

  const drawerWidth = 256;
  const drawerCollapsed = !isMobile && !navDrawerStat;
  const currentPath = window.location.pathname;

  const handleToggleExpand = (segment) => {
    setExpandedItems((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };

  const handleMenuOpen = (event, item) => {
    if (drawerCollapsed && item.children) {
      setMenuAnchorEl(event.currentTarget);
      setMenuItems(item.children);
      setMenuTitle(item.title);
    }
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuItems([]);
  };

  // Close mobile drawer when window is resized to desktop size
  useEffect(() => {
    if (!isMobile) {
      // Reset expanded items when switching to desktop
      setExpandedItems({});
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{
          width: { md: drawerCollapsed ? theme.spacing(9) : drawerWidth },
          flexShrink: { md: 0 },
          zIndex: theme.zIndex.drawer,
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={isMobile && navDrawerStat}
          onClose={() => toggleNavBar(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <DrawerContent
            navlist={navlist}
            drawerCollapsed={drawerCollapsed}
            expandedItems={expandedItems}
            onToggleExpand={handleToggleExpand}
            currentPath={currentPath}
            onNavigate={handleNavigate}
            onMenuOpen={handleMenuOpen}
            menuAnchorEl={menuAnchorEl}
            menuItems={menuItems}
            menuTitle={menuTitle}
            onMenuClose={handleMenuClose}
            theme={theme}
          />
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerCollapsed ? theme.spacing(9) : drawerWidth,
              overflowX: "hidden",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              whiteSpace: "nowrap",
            },
          }}
          open
        >
          <DrawerContent
            navlist={navlist}
            drawerCollapsed={drawerCollapsed}
            expandedItems={expandedItems}
            onToggleExpand={handleToggleExpand}
            currentPath={currentPath}
            onNavigate={handleNavigate}
            onMenuOpen={handleMenuOpen}
            menuAnchorEl={menuAnchorEl}
            menuItems={menuItems}
            menuTitle={menuTitle}
            onMenuClose={handleMenuClose}
            theme={theme}
          />
        </Drawer>
      </Box>

      <MainContent drawerWidth={drawerWidth} drawerCollapsed={drawerCollapsed}>
        {children}
      </MainContent>
    </Box>
  );
}
