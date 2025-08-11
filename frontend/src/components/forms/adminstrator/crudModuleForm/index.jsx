import { Paper } from "@mui/material";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import ClassicDialog from "components/dialog/ClassicDialog";
import FormHeading from "components/forms/element/FormHeading";
import MuiMultiSelectField from "components/mui/MuiMultiSelect";
import MuiTextField from "components/mui/MuiTextField";
import ClassicInnerTable from "components/table/innerTable";
import { PROJ_CATEGORY } from "list/optionsList";
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
  const [category, setCategory] = useState();

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

      setProcessObj({ subModules: defaultData.subModules });
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
      subModules: [...isDataArray(prev?.subModules), payload],
    }));

    handleClose();
  };

  const moduleBoxAction = <MuiSubmitBtn onSubmit={handleSubModuleSubmit} />;

  return (
    <>
      <form ref={formRef} className="mb-4">
        <FormHeading title="Module" icon={ICON_NAME.MODULE} />

        <Paper className="p-4 my-4">
          <div className="mb-4">
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

          <div className="mb-4">
            <MuiTextField
              label="Tag"
              required={true}
              textProps={{
                name: "tag",
                placeholder: "e.g. tag",
                onChange: onChange,
                onBlur: onBlur,
                slotProps: { htmlInput: { maxLength: 30 } },
              }}
              error={errors["tag"]}
            />
          </div>
          <div className="mt-2">
            <MuiMultiSelectField
              label="Category"
              name="category"
              value={category}
              options={PROJ_CATEGORY}
              handleProcessObj={(obj) => setCategory(obj.category)}
              error={errors["category"]}
            />
          </div>
        </Paper>
      </form>

      <FormHeading
        title="Sub Module"
        icon={ICON_NAME.SUB_MODULE}
        action={{
          icon: ICON_NAME.ADD_CHAT,
          onClick: handleCreateNew,
        }}
      />

      <div className="mt-3">
        <ClassicInnerTable
          headers={ADMINSTRATOR_HEADER.CREATE_MODULE}
          rows={isDataArray(processObj?.subModules)}
          placeholder={placeholderDetails}
          keyPicker="name"
        />
      </div>

      <ClassicDialog
        open={!!dialogObj.status}
        title="Sub Module"
        handleToggle={handleClose}
        actionContainer={moduleBoxAction}
      >
        <SubModuleForm
          ref={subFormRef}
          defaultData={dialogObj}
          subModules={processObj.subModules}
        />
      </ClassicDialog>
    </>
  );
}
