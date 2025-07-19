import ResponsiveDrawer from "components/drawer/ResponsiveDrawer";
import { dashboard_navigation } from "list/navlist";
import ChildRoutes from "routes/childRoute";
import { dashboard_crl } from "routes/childRoutelist";

export default function DashboardPage() {
  return (
    <>
      <ResponsiveDrawer navlist={dashboard_navigation()}>
        <ChildRoutes routelist={dashboard_crl} />
      </ResponsiveDrawer>
    </>
  );
}
