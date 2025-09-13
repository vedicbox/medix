import { AppBar } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useLocation, useNavigate } from "react-router-dom";
export default function ScrollableTabs(props) {
  const { navlist } = props;
  const navigation = useNavigate();
  const indexVal = useLocation().state?.index || 0;

  const handleClick = (obj) => {
    navigation(obj.pathname, { state: obj.state });
  };

  return (
    <AppBar
      position="static"
      className="br-bottom"
      color="inherit"
      elevation={0}
    >
      <Tabs
        value={Number(indexVal)}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
      >
        {navlist.map((navObj) => (
          <Tab
            key={navObj.label}
            sx={{ minWidth: 150 }}
            label={navObj.label}
            onClick={() => handleClick(navObj.segment)}
          />
        ))}
      </Tabs>
    </AppBar>
  );
}
