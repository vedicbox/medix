import { useState } from "react";

import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import ClassicMenu from "components/menu/ClassicMenu";
import { profile_mnlst } from "list/menulist";
import { useSelector } from "react-redux";

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

  const topContent = (
    <div className="px-3 py-2 br-bottom">
      <Typography variant="subtitle2" noWrap>
        {authUser.firstName + " " + authUser.lastName}
      </Typography>
      {/* <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
        @ {authUser.username}
      </Typography> */}
    </div>
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
