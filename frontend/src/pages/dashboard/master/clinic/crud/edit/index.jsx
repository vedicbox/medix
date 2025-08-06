import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditClinicQuery, useUpdateClinicMutation } from "service/clinicService";
import { HTTP_STATUS_CODES } from "values/enum";
import CrudClinicMaster from "..";

export default function ClinicUpdatePage() {
  const formRef = useRef(null);
  const { clinicId } = useLocation()?.state || {};
  const [updateClinic] = useUpdateClinicMutation();
  const [errors, setErrors] = useState(null);
  const [processObj, setProcessObj] = useState({});
  const navigate = useNavigate();
  const { data: clinicData } = useEditClinicQuery({ clinicId });
  const clinicDefaultData = clinicData?.payload || {};

  const handleSubmit = async () => {
    const formData = await formRef.current.preparedData();
    formData["clinicId"] = clinicId;
    console.log(formData);
    
    if (formData) {
       let { data, error } = await updateClinic(formData);
            if (data?.status == HTTP_STATUS_CODES.OK) {
              navigate(-1);
            } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
              setErrors(error?.data?.payload?.details || {});
            }
        }
    // const isValid = await validateAll(formData);
    // if (isValid) {
    //   let { data, error } = await createStaffMutation(formData);
    //   if (data?.status == HTTP_STATUS_CODES.OK) {
    //     navigate(-1);
    //   } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
    //     setErrors(error?.data?.payload?.details || {});
    //   }
    // }
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.MASTER.CLINIC.UPDATE} />
      <CrudClinicMaster
        defaultError={errors}
        processObj={processObj}
        setProcessObj={setProcessObj}
        ref={formRef}
        defaultData={clinicDefaultData}
      />

      <MuiSubmitBtn onSubmit={handleSubmit} className="text-center" />
    </>
  );
}
