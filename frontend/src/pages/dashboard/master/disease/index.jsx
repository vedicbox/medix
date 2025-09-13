import ScrollableTabsButtonAuto from "components/tabs/ScrollableTabs";
import { diseaseNavlist } from "list/navlist/subNavlist";
import { masterNsRoute } from "routes/panel-list/nestedRoutelist";
import ChildRoutes from "routes/panel/ChildRoutePanel";

export default function ManageDisease() {
  return (
    <>
      <ScrollableTabsButtonAuto navlist={diseaseNavlist} />

      <ChildRoutes routelist={masterNsRoute.disease} />
    </>
  );
}
