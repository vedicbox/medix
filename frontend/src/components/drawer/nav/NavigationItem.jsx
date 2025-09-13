import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  alpha,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import Iconify from "components/icons/Iconify";

// Styled Components
const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 1.5),
  minHeight: 40,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  ...(selected && {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  }),
}));

const HeaderText = styled(Typography)(({ theme, $drawerCollapsed }) => ({
  px: 2,
  py: 1,
  display: "block",
  color: "text.secondary",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.5px",
  opacity: $drawerCollapsed ? 0 : 1,
  transition: "opacity 0.2s",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

// Helper Components
const DividerItem = ({ drawerCollapsed }) => (
  <Divider sx={{ my: 1, opacity: drawerCollapsed ? 0 : 1 }} />
);

const HeaderItem = ({ item, drawerCollapsed }) => {
  if (drawerCollapsed) return null;
  
  return (
    <HeaderText variant="overline" $drawerCollapsed={drawerCollapsed}>
      {item.title}
    </HeaderText>
  );
};

const NavigationIcon = ({ icon, color = "text.secondary" }) => (
  <Iconify icon={icon} sx={{ color }} />
);

// Child Items Component
const ChildItems = ({ children, currentPath, onNavigate, isExpanded }) => (
  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
    <List component="div" disablePadding sx={{ pl: 3 }}>
      {children.map((child) => (
        <ChildItem
          key={child.segment?.pathname}
          child={child}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      ))}
    </List>
  </Collapse>
);

const ChildItem = ({ child, currentPath, onNavigate }) => {
  const isChildSelected = currentPath === `/${child.segment?.pathname}`;
  
  return (
    <ListItem disablePadding>
      <StyledListItemButton
        selected={isChildSelected}
        onClick={() => onNavigate(child.segment?.pathname)}
        sx={{ minHeight: 40, pl: 2 }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 2,
            justifyContent: "center",
            color: isChildSelected ? "primary.main" : "text.secondary",
          }}
        >
          <NavigationIcon 
            icon={child.icon} 
            color={isChildSelected ? "primary.main" : "text.secondary"} 
          />
        </ListItemIcon>
        <ListItemText
          primary={child.title}
          sx={{
            "& .MuiTypography-root": {
              fontSize: "0.875rem",
              fontWeight: isChildSelected ? 600 : 400,
            },
            color: isChildSelected ? "primary.main" : "text.secondary",
          }}
        />
      </StyledListItemButton>
    </ListItem>
  );
};

// Main Navigation Item Component
const MainNavigationItem = ({ 
  item, 
  drawerCollapsed, 
  isSelected, 
  hasChildren, 
  isExpanded, 
  handleClick 
}) => (
  <Tooltip
    title={item.title}
    placement="right"
    disableHoverListener={!drawerCollapsed}
    arrow
  >
    <ListItem disablePadding sx={{ position: "relative", overflow: "visible", px: 1 }}>
      <StyledListItemButton
        selected={isSelected}
        onClick={handleClick}
        sx={{
          minHeight: 40,
          justifyContent: drawerCollapsed ? "center" : "initial",
          px: 1.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: drawerCollapsed ? 0 : 2,
            justifyContent: "center",
            color: isSelected ? "primary.main" : "text.secondary",
          }}
        >
          <NavigationIcon 
            icon={item.icon} 
            color={isSelected ? "primary.main" : "text.secondary"} 
          />
        </ListItemIcon>
        
        {!drawerCollapsed && (
          <>
            <ListItemText
              primary={item.title}
              sx={{
                opacity: 1,
                "& .MuiTypography-root": {
                  fontSize: "0.875rem",
                  fontWeight: isSelected ? 600 : 400,
                },
              }}
            />
            {hasChildren && (
              isExpanded ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />
            )}
          </>
        )}
      </StyledListItemButton>
    </ListItem>
  </Tooltip>
);

// Main Component
export default function NavigationItem({
  item,
  drawerCollapsed,
  expandedItems,
  onToggleExpand,
  currentPath,
  onNavigate,
  onMenuOpen,
}) {
  // Use hooks first (before any conditional returns)
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems[item.title] || false;
  const isSelected = currentPath === `/${item.segment?.pathname}`;

  const handleClick = (event) => {
    if (drawerCollapsed && hasChildren) {
      onMenuOpen(event, item);
    } else if (hasChildren) {
      onToggleExpand(item.title);
    } else {
      onNavigate(item.segment?.pathname);
    }
  };

  // Handle special item types with conditional rendering instead of early returns
  if (item.kind === "divider") {
    return <DividerItem drawerCollapsed={drawerCollapsed} />;
  }

  if (item.kind === "header") {
    return <HeaderItem item={item} drawerCollapsed={drawerCollapsed} />;
  }

  // Regular navigation item
  return (
    <>
      <MainNavigationItem
        item={item}
        drawerCollapsed={drawerCollapsed}
        isSelected={isSelected}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        handleClick={handleClick}
      />

      {hasChildren && !drawerCollapsed && (
        <ChildItems
          children={item.children}
          currentPath={currentPath}
          onNavigate={onNavigate}
          isExpanded={isExpanded}
        />
      )}
    </>
  );
}