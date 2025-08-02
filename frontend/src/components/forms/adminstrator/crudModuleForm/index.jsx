import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import ClassicDialog from "components/dialog/ClassicDialog";
import FormHeading from "components/forms/element/FormHeading";
import MuiTextField from "components/mui/MuiTextField";
import ClassicInnerTable from "components/table/innerTable";
import { ADMINSTRATOR_HEADER } from "list/tableColist";
import { useEffect, useRef, useState } from "react";
import { isDataArray } from "utils/parse";
import { ICON_NAME, PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";
import SubModuleForm from "./SubModuleForm";

const placeholderDetails = {
  img: PLACEHOLDER_IMG.NO_PATIENTS_ALIGN,
  heading: PLACEHOLDER_MSG.NO_PATIENTS_ALIGN,
};

export default function CrudModuleForm(props) {
  const {
    defaultData,
    errors,
    formRef,
    onChange,
    onBlur,
    processObj,
    setProcessObj,
  } = props;
  const [dialogObj, setDialogObj] = useState({});
  const [status, setStatue] = useState("0");

  const subFormRef = useRef(null);

  useEffect(() => {
    if (defaultData) {
      Object.entries(defaultData).forEach(([key, value]) => {
        // Find the input element by name
        const inputElement = formRef.current.elements[key];
        if (inputElement) {
          // Set the value of the input element
          inputElement.value = value;
        }
      });
    }
  }, [defaultData]);

  const handleClose = () => {
    setDialogObj({});
  };

  const handleCreateNew = () => {
    setDialogObj({ status: true });
  };

  const handleSubModuleSubmit = async () => {
    if (!subFormRef.current) return;

    const payload = await subFormRef.current.preparedData();
    if (!payload) return;

    setProcessObj((prev) => ({
      ...prev,
      subModule: [...isDataArray(prev?.subModule), payload],
    }));

    handleClose();
  };

  const moduleBoxAction = <MuiSubmitBtn onSubmit={handleSubModuleSubmit} />;

  return (
    <>
      <form
        ref={formRef}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <FormHeading title="Module" icon={ICON_NAME.MODULE} />

        <div>
          <MuiTextField
            label="Name"
            required={true}
            textProps={{
              name: "name",
              placeholder: "e.g. Abcd",
              onChange: onChange,
              onBlur: onBlur,
              slotProps: { htmlInput: { maxLength: 30 } },
            }}
            error={errors["name"]}
          />
        </div>

        <div className="mt-2">
          <MuiTextField
            label="Description"
            error={errors["desc"]}
            textProps={{
              name: "desc",
              rows: 2,
              multiline: true,
              onChange,
              onBlur,
            }}
          />
        </div>
      </form>

      <FormHeading
        title="Sub Module"
        icon={ICON_NAME.SUB_MODULE}
        action={{
          icon: ICON_NAME.ADD_CHAT,
          onClick: handleCreateNew,
        }}
      />

      <ClassicInnerTable
        headers={ADMINSTRATOR_HEADER.CREATE_MODULE}
        rows={isDataArray(processObj?.subModule)}
        placeholder={placeholderDetails}
        keyPicker="name"
      />

      <ClassicDialog
        open={!!dialogObj.status}
        title="Sub Module"
        handleToggle={handleClose}
        actionContainer={moduleBoxAction}
      >
        <SubModuleForm
          ref={subFormRef}
          defaultData={dialogObj}
          subModule={processObj.subModule}
        />
      </ClassicDialog>
    </>
  );
}
