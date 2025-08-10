import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEditClinicQuery,
  useUpdateClinicMutation,
} from "service/clinicService";
import ClinicFormUtil from "../ClinicFormUtil";
import { HTTP_STATUS_CODES } from "values/enum";

export default function ClinicUpdatePage() {
  const formRef = useRef(null);
  const { clinicId } = useLocation()?.state || {};

  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();
  const { data: clinicData } = useEditClinicQuery({ clinicId });
  const clinicDefaultData = clinicData?.payload || {};

  const [updateClinic] = useUpdateClinicMutation();

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();
    formData["clinicId"] = clinicId;

    if (formData) {
      let { data, error } = await updateClinic(formData);
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
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.MASTER.CLINIC.UPDATE} />
      <ClinicFormUtil
        processObj={processObj}
        setProcessObj={setProcessObj}
        ref={formRef}
        defaultData={clinicDefaultData}
      />

      <MuiSubmitBtn onSubmit={handleSubmit} className="text-center mt-4" />
    </>
  );
}
