import ResponsiveDrawer from "components/drawer/ResponsiveDrawer";
import { patientboard_navigation } from "list/navlist";
import PageNotFound from "pages/other/PageNotFound";
import { useParams } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { patientboard_crl } from "routes/childRoutelist";
import { useValidatePatientQuery } from "service/patientService";

export default function PatientDashboard() {
  const { holder: caseId } = useParams();

  // Call the auth check query
  const { data: patientData, isLoading } = useValidatePatientQuery({ caseId });

  if (!isLoading && patientData?.payload?.caseId != caseId) {
    return <PageNotFound />;
  }

  return (
    <ResponsiveDrawer navlist={patientboard_navigation(caseId)}>
      <ChildRoutes routelist={patientboard_crl} />
    </ResponsiveDrawer>
  );
}
