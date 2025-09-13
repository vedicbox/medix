import EntityAssignForm from "components/forms/staff/EntityAssignForm";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useGetRoleNamesQuery } from "service/auth/roleService";
import { useGetClinicNamesQuery } from "service/master/clinicService";
import { ASSIGN_ENTITY_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";

const EntityAssignUtil = forwardRef((props, ref) => {
  const { processObj, setProcessObj, defaultData } = props;

  const { data: roleData } = useGetRoleNamesQuery();
  const { data: clinicData } = useGetClinicNamesQuery();

  let roleslist = roleData?.payload || [];
  let cliniclist = clinicData?.payload || [];

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(ASSIGN_ENTITY_RULES);

  useImperativeHandle(ref, () => ({
    preparedData,
    setErrors,
  }));

  const initDefaultData = async () => {
    let roleObj = defaultData.userRef?.roleRef?._id;
    let clinicObj = defaultData.userRef?.clinicRef?._id;

    let roleRef = roleslist.find((el) => el._id == roleObj);
    let clinicRef = cliniclist.find((el) => el._id == clinicObj);

    handleProcessObj({
      roleRef,
      clinicRef,
    });
  };

  const preparedData = async () => {
    const formData = {
      roleRef: processObj["roleRef"]?._id,
      clinicRef: processObj["clinicRef"]?._id,
    };

    const isValid = await validateAll(formData);
    if (isValid) return formData;
  };

  useEffect(() => {
    if (defaultData?._id) initDefaultData();
  }, [defaultData]);

  const handleProcessObj = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };

  return (
    <>
      <EntityAssignForm
        errors={errors}
        processObj={processObj}
        handleProcessObj={handleProcessObj}
        roleslist={roleslist}
        cliniclist={cliniclist}
      />
    </>
  );
});

export default EntityAssignUtil;
