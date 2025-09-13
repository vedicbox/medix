import { Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import Iconify from "components/icons/Iconify";
import ClassicMenu from "components/menu/ClassicMenu";
import { useNavigate } from "react-router-dom";

export default function ButtonBreadCrumbs(props) {
  const { topBar = [], breadlist = [] } = props;
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleRedirect = (btnOptions) => {
    if (btnOptions.link) {
      navigate(btnOptions.link?.pathname, { state: btnOptions.link?.state });
    } else if (btnOptions.handler) {
      btnOptions.handler();
    }
  };

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
          onClick={() => handleRedirect(btnOptions)}
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
