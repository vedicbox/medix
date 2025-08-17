import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateStaffMeetingMutation } from "service/staffMeetingService";
import { HTTP_STATUS_CODES } from "values/enum";
import MeetingFormUtil from "../MeetingFormUtil";

export default function AddMeetingPage() {
  const { staffId } = useLocation()?.state || {};

  console.log(useLocation(),"location")

  const formRef = useRef(null);
  const [createStaffMeeing] = useCreateStaffMeetingMutation();
  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (processObj) {
      let { data, error } = await createStaffMeeing(processObj);
      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        handleServerSideErrors(error?.data?.payload?.details || {});
      }
    }
  };
  const handleServerSideErrors = (errors = {}) => {
    formRef.current?.setErrors(errors);
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.MASTER.CLINIC.CREATE} />
      <MeetingFormUtil
        processObj={processObj}
        setProcessObj={setProcessObj}
        ref={formRef}
      />

      <MuiSubmitBtn onSubmit={handleSubmit} className="text-center mt-4" />
    </>
  );
}
