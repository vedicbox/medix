import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import StaffFormUtil from "pages/dashboard/staff/enrollCrud/formUtil/StaffFormUtil";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetAdminDetailsQuery,
  useUpdateAdminDetailsMutation,
} from "service/adminstrator/orgService";
import { HTTP_STATUS_CODES } from "values/enum";

export default function AdminEditPage() {
  const { orgId } = useLocation().state;

  const navigate = useNavigate();
  const staffFormRef = useRef(null);

  const [processObj, setProcessObj] = useState({});

  const { data: adminData } = useGetAdminDetailsQuery({ orgId });
  const adminDefaultData = adminData?.payload || {};
  const [updateAdminMutation, { isLoading }] = useUpdateAdminDetailsMutation();

  const onSubmit = async () => {
    const orgFormData = await staffFormRef.current.preparedData();
    orgFormData["_id"] = orgId;
    orgFormData["userId"] = adminDefaultData.userRef._id;

    if (orgFormData) {
      let { data, error } = await updateAdminMutation(orgFormData);

      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        handleServerSideErrors(error?.data?.payload?.details);
      }
    }
  };

  const handleServerSideErrors = (errors = {}) => {
    staffFormRef.current?.setErrors(errors);
  };

  return (
    <>
      <StaffFormUtil
        processObj={processObj}
        setProcessObj={setProcessObj}
        ref={staffFormRef}
        defaultData={adminDefaultData}
      />

      <div className="mt-4 text-center">
        <MuiSubmitBtn onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </>
  );
}
