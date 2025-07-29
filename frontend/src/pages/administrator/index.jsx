import ResponsiveDrawer from "components/drawer/ResponsiveDrawer";
import { administrator_nav } from "list/navlist";
import ChildRoutes from "routes/childRoute";
import { administrator_crl } from "routes/childRoutelist";

export default function AdminstratorPage() {
  return (
    <>
      <ResponsiveDrawer navlist={administrator_nav()}>
        <ChildRoutes routelist={administrator_crl} />
      </ResponsiveDrawer>
    </>
  );
}
