import { AppBar } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { global_msr } from "values/measure";

export default function ScrollableTabs(props) {
  const { navlist, indexVal, handleChange } = props;

  return (
    <AppBar
      position="static"
      className="br-bottom"
      color="inherit"
      elevation={0}
    >
      <Tabs
        value={indexVal}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        textColor="inherit"
      >
        {navlist.map((navObj) => (
          <Tab
            key={navObj.label}
            sx={{ minWidth: global_msr._150 }}
            label={navObj.label}
          />
        ))}
      </Tabs>
    </AppBar>
  );
}
