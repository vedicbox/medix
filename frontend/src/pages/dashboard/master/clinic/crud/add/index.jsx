import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateClinicMutation } from "service/clinicService";
import { HTTP_STATUS_CODES } from "values/enum";
import ClinicFormUtil from "../ClinicFormUtil";

export default function ClinicAddPage() {
  const formRef = useRef(null);
  const [createClinic] = useCreateClinicMutation();
  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await createClinic(formData);
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
      <ClinicFormUtil
        processObj={processObj}
        setProcessObj={setProcessObj}
        ref={formRef}
      />

      <MuiSubmitBtn onSubmit={handleSubmit} className="text-center mt-4" />
    </>
  );
}
