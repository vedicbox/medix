import React, { useState } from "react";

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import ClassicMenu from "components/menu/ClassicMenu";
import { profile_mnlst } from "list/menulist";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ADMINISTRATOR_ROUTE } from "routes/routeurl";
import { ROLE_ENUM } from "values/enum";

export default function HeaderProfilePopover() {
  const [open, setOpen] = useState(null);

  const authUser = useSelector((state) => state.auth.user);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const listenerBox = {
    logout: () => handleLogout(),
  };

  const isAdminstrator = authUser?.roleRef?.name === ROLE_ENUM.ADMINISTRATOR;
  
  const topContent = (
    <ListItem
      component={isAdminstrator ? NavLink : undefined}
      to={ADMINISTRATOR_ROUTE.INDEX}
      className="br-bottom"
    >
      <ListItemAvatar>
        <Avatar src={authUser.avatar} alt={authUser.firstName} />
      </ListItemAvatar>
      <ListItemText
        primary={authUser.firstName + " " + authUser.lastName}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.primary", display: "inline" }}
            >
              {authUser?.roleRef?.name}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );

  return (
    <>
      <ClassicMenu
        topContent={topContent}
        menulist={profile_mnlst(listenerBox, authUser)}
      >
        <IconButton
          onClick={handleOpen}
          sx={{
            width: 40,
            height: 40,
            background: (theme) => alpha(theme.palette.grey[500], 0.88),
            ...(open && {
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            }),
          }}
        >
          <Avatar
            src={authUser.avatar}
            alt={authUser.firstName}
            sx={{
              width: 36,
              height: 36,
              border: (theme) =>
                `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {authUser.firstName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </IconButton>
      </ClassicMenu>
    </>
  );
}
