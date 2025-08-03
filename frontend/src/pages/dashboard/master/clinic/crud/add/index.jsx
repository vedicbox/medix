import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateClinicMutation } from "service/clinicService";
import { HTTP_STATUS_CODES } from "values/enum";
import CrudClinicMaster from "..";

export default function ClinicAddPage() {
  const formRef = useRef(null);
  const [createClinic] = useCreateClinicMutation();
  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();

    if (formData) {
      let { data, error } = await createClinic(formData);
      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        setErrors(error?.data?.payload?.details || {});
      }
    }
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.MASTER.CLINIC.CREATE} />
      <CrudClinicMaster
        defaultError={errors}
        processObj={processObj}
        setProcessObj={setProcessObj}
        ref={formRef}
      />

      <MuiSubmitBtn onSubmit={handleSubmit} className="text-center" />
    </>
  );
}
