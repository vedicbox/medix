import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetOrgDetailsQuery,
  useUpdateOrgDetailsMutation
} from "service/adminstrator/orgService";
import { HTTP_STATUS_CODES } from "values/enum";
import OrgFormUtil from "../OrgFormUtil";

export default function OrgEditPage() {
  const { orgId } = useLocation().state;

  const navigate = useNavigate();
  const orgFormRef = useRef(null);

  const [processObj, setProcessObj] = useState({});

  const { data: orgData } = useGetOrgDetailsQuery({ orgId });
  const orgDefaultData = orgData?.payload || {};
  const [updateOrgMutation, { isLoading }] = useUpdateOrgDetailsMutation();

  const onSubmit = async () => {
    const orgFormData = await orgFormRef.current.preparedData();
    orgFormData["orgId"] = orgId;

    if (orgFormData) {
      let { data, error } = await updateOrgMutation(orgFormData);

      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        handleServerSideErrors(error?.data?.payload?.details);
      }
    }
  };

  const handleServerSideErrors = (errors = {}) => {
    orgFormRef.current?.setErrors(errors);
  };

  return (
    <>
      <OrgFormUtil
        processObj={processObj}
        setProcessObj={setProcessObj}
        ref={orgFormRef}
        defaultData={orgDefaultData}
      />

      <div className="mt-4 text-center">
        <MuiSubmitBtn onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </>
  );
}
