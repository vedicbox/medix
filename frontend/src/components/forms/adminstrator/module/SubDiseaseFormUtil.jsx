import { IconButton } from "@mui/material";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import ClassicDialog from "components/dialog/ClassicDialog";
import FormHeading from "components/forms/element/FormHeading";
import Iconify from "components/icons/Iconify";
import MuiClassicTable from "components/table/MuiClassicTable";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useEffect, useRef, useState } from "react";
import { isDataArray } from "utils/parse";
import { DISEASE_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { ICON_NAME } from "values/img-links";
import ModuleForm from "./ModuleForm";
import DiseaseForm from "./DiseaseForm";

export default function SubDiseaseFormUtil(props) {
  const { setSubDiseases, subDiseases } = props;
  const formRef = useRef(null);
  const [dialogObj, setDialogObj] = useState({});
  const [processObj, setProcessObj] = useState({});
  

  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleErrorUpdate,
    validateAll,
  } = useFormValidation(DISEASE_FORM_RULES);

  useEffect(() => {
    if (dialogObj?.row) initDefaultData(dialogObj?.row);
  }, [dialogObj]);

  console.log(processObj + "------->processObj");
  
  const initDefaultData = async (defaultData) => {
    Object.entries(defaultData).forEach(([key, value]) => {
      const inputElement = formRef.current.elements[key];
      if (inputElement) {
        inputElement.value = value;
      }
    });
    setProcessObj({
      status: defaultData.status,
    });
  };

  
  const handleCreateNew = (row = {}) => {
    setDialogObj({ status: true, row });
  };

  const handleClose = () => {
    setProcessObj({});
    formRef.current?.reset();
    setDialogObj({});
  };

  const handleSubmit = async () => {
      console.log('dialogObj.row ->', dialogObj.row);
    
   let formData = {
      ...dialogObj?.row,
      ...Object.fromEntries(new FormData(formRef.current)),
    };

    const isValid = await validateAll(formData);
     console.log('FORMDATA ->', formData);
    if (isValid) {
      let  newSubmodules = [...subDiseases, formData];;
      setSubDiseases((prev) => ({ ...prev, subDiseases: newSubmodules }));
      console.log(subDiseases);
      handleClose();
    }
  };

  const actionBox = (row) => (
    <IconButton onClick={() => handleCreateNew(row)}>
      <Iconify icon={ICON_NAME.EDIT} />
    </IconButton>
  );

  const moduleBoxAction = <MuiSubmitBtn onSubmit={handleSubmit} />;

  const handleProcessObj = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };
  console.log("subDiseases--->"+subDiseases);
  
  return (
    <>
      <FormHeading
        title="Sub Disease"
        icon={ICON_NAME.SUB_MODULE}
        action={{
          icon: ICON_NAME.ADD_CHAT,
          onClick: handleCreateNew,
        }}
      />

      <div className="mt-3">
        <MuiClassicTable
          rows={isDataArray(subDiseases)}
          colObj={DASHBOARD_TBCOL.subdisease()}
          actionList={(row) => actionBox(row)}
        />
      </div>

      <ClassicDialog
        open={dialogObj.status}
        title="Sub Disease"
        handleToggle={handleClose}
        actionContainer={moduleBoxAction}
      >
        <form ref={formRef}>
          <DiseaseForm
            processObj={processObj}
            handleProcessObj={handleProcessObj}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </form>
      </ClassicDialog>
    </>
  );
}
