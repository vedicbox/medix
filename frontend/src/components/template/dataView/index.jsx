import { Button, IconButton, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import Iconify from "components/icons/Iconify";
import ClassicMenu from "components/menu/ClassicMenu";
import ClassicTable from "components/table/classic";
import ClassicMobileView from "components/table/mobileView";
import { NavLink, useNavigate } from "react-router-dom";
import { ICON_NAME } from "values/img-links";

export default function DataViewTemplate(props) {
  const {
    header,
    rows,
    actionList,
    placeholderDetails = {},
    topBar = [],
    breadlist = [],
  } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAction = (itemObj) => {
    if (itemObj.link) {
      navigate(itemObj.link?.pathname, { state: itemObj.link?.stateDat });
    } else if (itemObj.handler) {
      itemObj.handler();
    }
  };

  const renderActionBox = (row) =>
    actionList && (
      <ClassicMenu menulist={actionList(row)}>
        <IconButton size="small">
          <Iconify icon={ICON_NAME.VERTICAL_CIRCLE_LIGHT}/>
        </IconButton>
      </ClassicMenu>
    );

  const renderMobileActionBox = (row) =>
    actionList && (
      <Stack direction="row" justifyContent="flex-end">
        {actionList(row).map((itemObj) => (
          <IconButton key={itemObj.icon} onClick={() => handleAction(itemObj)}>
            <Iconify icon={itemObj.icon} />
          </IconButton>
        ))}
      </Stack>
    );

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

      <div className="mt-3">
        {isMobile ? (
          <ClassicMobileView
            headers={header}
            rows={rows}
            actionContainer={renderMobileActionBox}
            placeholder={placeholderDetails}
          />
        ) : (
          <ClassicTable
            headers={header}
            rows={rows}
            isFetching={false}
            actionContainer={renderActionBox}
            placeholder={placeholderDetails}
          />
        )}
      </div>
    </>
  );
}
