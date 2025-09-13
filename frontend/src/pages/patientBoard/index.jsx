import ResponsiveDrawer from "components/drawer/ResponsiveDrawer";
import { patientboard_nav } from "list/navlist/childNavlist";
import PageNotFound from "pages/other/PageNotFound";
import { useParams } from "react-router-dom";
import ChildRoutes from "routes/panel/ChildRoutePanel";
import { patientboard_crl } from "routes/panel-list/childRoutelist";
import { useValidatePatientQuery } from "service/patientService";

export default function PatientDashboard() {
  const { holder: caseId } = useParams();

  // Call the auth check query
  const { data: patientData, isLoading } = useValidatePatientQuery({ caseId });

  if (!isLoading && patientData?.payload?.caseId != caseId) {
    return <PageNotFound />;
  }

  return (
    <ResponsiveDrawer navlist={patientboard_nav(caseId)}>
      <ChildRoutes routelist={patientboard_crl} />
    </ResponsiveDrawer>
  );
}
