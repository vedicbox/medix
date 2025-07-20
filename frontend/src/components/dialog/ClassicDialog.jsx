import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Iconify from "components/icons/Iconify";
import ScrollBarLayout from "components/layout/ScrollBarLayout";
import DisplayContent from "components/placeholder/DisplayContent";
import * as React from "react";
import { ICON_NAME } from "values/img-links";

const BootstrapDialog = styled(Dialog)(({ theme, ownerState }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    minWidth: ownerState.minWidth,
  },
}));

export default function ClassicDialog(props) {
  const {
    open,
    handleToggle,
    title,
    minWidth = 550,
    actionContainer,
    children,
    titleIcon,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <BootstrapDialog
        fullScreen={fullScreen}
        keepMounted
        open={open}
        ownerState={{ minWidth: fullScreen ? "100%" : minWidth }}
      >

        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className="d-flex align-items-center">

          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleToggle}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Iconify icon={ICON_NAME.CLOSE_ONE} />
        </IconButton>
        <DialogContent dividers>
          <ScrollBarLayout>{children} </ScrollBarLayout>
        </DialogContent>
        <DisplayContent valid1={actionContainer}>
          <DialogActions>{actionContainer}</DialogActions>
        </DisplayContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
