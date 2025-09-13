import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { styled } from "@mui/material/styles";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  right: 65,
  bottom: 10,
  "& .MuiSpeedDial-fab ": {
    width: "40px",
    height: "40px",
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

export default function PlaygroundSpeedDial() {
  return (
    <StyledSpeedDial
      ariaLabel="SpeedDial playground example"
      icon={<SpeedDialIcon />}
      direction="left"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              title: action.name,
            },
          }}
        />
      ))}
    </StyledSpeedDial>
  );
}
