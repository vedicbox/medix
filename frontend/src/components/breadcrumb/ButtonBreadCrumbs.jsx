import { Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import Iconify from "components/icons/Iconify";
import ClassicMenu from "components/menu/ClassicMenu";
import { NavLink } from "react-router-dom";

export default function ButtonBreadCrumbs(props) {
  const { topBar = [], breadlist = [] } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderTopBarOptions = () => {
    if (isMobile && topBar.size > 1) {
      return (
        <ClassicMenu menulist={topBar}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="gg:menu-round" />}
            size="small"
          >
            Menu
          </Button>
        </ClassicMenu>
      );
    } else {
      return topBar.map((btnOptions) => (
        <Button
          key={btnOptions.label}
          variant="outlined"
          startIcon={<Iconify icon={btnOptions.icon} />}
          onClick={btnOptions.onClick}
          component={NavLink}
          to={btnOptions.link}
          className="elevation1"
        >
          {btnOptions.label}
        </Button>
      ));
    }
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={breadlist}>
        {renderTopBarOptions()}
      </CollapsedBreadcrumbs>
    </>
  );
}
