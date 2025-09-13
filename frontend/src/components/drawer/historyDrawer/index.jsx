import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import ScrollableTabs from "components/tabs/ScrollableTabs";
import * as React from "react";

const stepperSteps = [
  {
    label: "Org Enroll",
  },
  {
    label: "Admin Form",
  },
];

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={false}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: 1300,
        }}
      >
        <Box sx={{ width: 450 }} role="presentation">
          <ScrollableTabs navlist={stepperSteps} />
        </Box>
      </Drawer>
    </div>
  );
}
