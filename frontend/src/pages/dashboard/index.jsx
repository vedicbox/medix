import ResponsiveDrawer from "components/drawer/ResponsiveDrawer";
import { dashboard_navigation } from "list/navlist/childNavlist";
import ChildRoutes from "routes/panel/ChildRoutePanel";
import { dashboard_crl } from "routes/panel-list/childRoutelist";

export default function DashboardPage() {
  return (
    <>
      <ResponsiveDrawer navlist={dashboard_navigation()}>
        <ChildRoutes routelist={dashboard_crl} />
      </ResponsiveDrawer>
    </>
  );
}
