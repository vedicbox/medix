import ResponsiveDrawer from "components/drawer/ResponsiveDrawer";
import { administrator_nav } from "list/navlist/childNavlist";
import ChildRoutes from "routes/panel/ChildRoutePanel";
import { administrator_crl } from "routes/panel-list/childRoutelist";

export default function AdminstratorPage() {
  return (
    <>
      <ResponsiveDrawer navlist={administrator_nav()}>
        <ChildRoutes routelist={administrator_crl} />
      </ResponsiveDrawer>
    </>
  );
}
