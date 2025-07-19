import PageNotFound from "pages/other/PageNotFound";
import { useParams } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { patientboard_crl } from "routes/childRoutelist";
import { useValidatePatientQuery } from "service/patientService";

export default function PatientDashboard() {
  const { holder: caseId } = useParams();

  // Call the auth check query
  const { data, isLoading } = useValidatePatientQuery({ caseId });

  if (!isLoading && data?.payload?.caseId != caseId) {
    return <PageNotFound />;
  }

  return <ChildRoutes routelist={patientboard_crl} />;
}
