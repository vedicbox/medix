import { BottomNavigationAction, Box, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import HistoryDrawer from "components/drawer/historyDrawer";
import BackMark from "components/helperCmp/BackMark";
import Iconify from "../icons/Iconify";

export default function BottomAppBar() {
  return (
    <>
      <Box height={80} />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        variant="outlined"
      >
        <BottomNavigation
          showLabels
          sx={{ justifyContent: "end", alignItems: "center", px: 2 }}
        >
          <BottomNavigationAction
            label="History"
            icon={<Iconify icon="raphael:history" />}
            sx={{ maxWidth: 30 }}
          />
          <BottomNavigationAction
            label="Notes"
            icon={<Iconify icon="solar:notes-bold" />}
            sx={{ maxWidth: 30 }}
          />
          {/* <ClassicSpeedDial /> */}
          <BackMark />
        </BottomNavigation>
      </Paper>

      <HistoryDrawer />
    </>
  );
}
