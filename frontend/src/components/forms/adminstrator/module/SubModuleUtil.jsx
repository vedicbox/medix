import { IconButton } from "@mui/material";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import ClassicDialog from "components/dialog/ClassicDialog";
import FormHeading from "components/forms/element/FormHeading";
import Iconify from "components/icons/Iconify";
import MuiClassicTable from "components/table/MuiClassicTable";
import { ADMINSTRATOR_TBCOL } from "list/tableColist";
import { useEffect, useRef, useState } from "react";
import { isDataArray } from "utils/parse";
import { MODULE_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { ICON_NAME } from "values/img-links";
import ModuleForm from "./ModuleForm";

export default function SubModuleFormUtil(props) {
  const { setSubModules, subModules } = props;
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
  } = useFormValidation(MODULE_FORM_RULES);

  useEffect(() => {
    if (dialogObj?.row) initDefaultData(dialogObj?.row);
  }, [dialogObj]);

  const initDefaultData = async (defaultData) => {
    Object.entries(defaultData).forEach(([key, value]) => {
      const inputElement = formRef.current.elements[key];
      if (inputElement) {
        inputElement.value = value;
      }
    });

    setProcessObj({
      category: defaultData.category,
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
    let formData = {
      ...dialogObj?.row,
      ...Object.fromEntries(new FormData(formRef.current)),
    };

    const isValid = await validateAll(formData);
    if (isValid) {
      let newSubmodules;
      if (dialogObj?.row?.tag) {
        newSubmodules = subModules.map((el) => {
          if (el.tag == dialogObj?.row?.tag) {
            return formData;
          } else {
            return el;
          }
        });
      } else {
        newSubmodules = [...subModules, formData];
      }

      setSubModules((prev) => ({ ...prev, subModules: newSubmodules }));

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

  return (
    <>
      <FormHeading
        title="Sub Module"
        icon={ICON_NAME.SUB_MODULE}
        action={{
          icon: ICON_NAME.ADD_CHAT,
          onClick: handleCreateNew,
        }}
      />

      <div className="mt-3">
        <MuiClassicTable
          rows={isDataArray(subModules)}
          colObj={ADMINSTRATOR_TBCOL.moduleCreate()}
          actionList={(row) => actionBox(row)}
        />
      </div>

      <ClassicDialog
        open={dialogObj.status}
        title="Sub Module"
        handleToggle={handleClose}
        actionContainer={moduleBoxAction}
      >
        <form ref={formRef}>
          <ModuleForm
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
