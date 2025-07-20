import { Fab, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "./Iconify";
import { ICON_NAME } from "values/img-links";

export default function BackMark(props) {
  const { navigateVal = -1 } = props;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(navigateVal);
  };

  return (
    <>
      <Tooltip title="Back">
        <Fab
          onClick={handleBack}
          sx={{
            position: "fixed", // Fixes the position relative to the viewport
            bottom: 20, // 20px from the bottom of the screen
            right: 16, // 16px from the right of the screen
            zIndex: 1000, // Ensure it's above other content
          }}
          color="primary"
          size="small"
        >
          <Iconify icon={ICON_NAME.BACK} />
        </Fab>
      </Tooltip>
    </>
  );
}
