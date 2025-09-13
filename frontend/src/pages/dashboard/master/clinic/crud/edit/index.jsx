import CRUMB_NAV, { MASTER_CRUMB } from "list/crumb-list/crumbNav";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEditClinicQuery,
  useUpdateClinicMutation,
} from "service/master/clinicService";
import { HTTP_STATUS_CODES } from "values/enum";
import ClinicFormUtil from "../ClinicFormUtil";

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
      <CollapsedBreadcrumbs breadlist={CRUMB_NAV.master.clinic.update} />

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
