import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { alignPt_mnlst } from "list/menulist";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useGenerateConsultReceptMutation } from "service/filePublishService";
import { useFetchAlignPatientQuery } from "service/patientService";
import { formatMsg } from "utils/security/validation";
import { ICON_NAME, PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";
import DialogBox from "./dialogBox";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_PATIENTS_ALIGN,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "patient align" }),
};

export default function ManagePatient() {
  const navigate = useNavigate();
  const [dialogObj, setDialogObj] = useState({});

  const { data: alignPtlist } = useFetchAlignPatientQuery();
  let patientTbData = alignPtlist?.payload || [];

  const [generateConsultRecept] = useGenerateConsultReceptMutation();

  const handleDialogStatus = (row) => {
    setDialogObj(row);
    navigate(PARAMS_ROUTE.MOVE);
  };

  const handlePublish = async (row) => {
    const { _id } = row;
    const packet = {
      alignPatientId: _id,
    };
    await generateConsultRecept(packet).unwrap();
  };

  const listenerBox = (row) => {
    return {
      move: () => handleDialogStatus(row),
      publish: () => handlePublish(row),
    };
  };

  const topBar = [
    {
      label: "Consult",
      icon: ICON_NAME.CONSULT,
      link: {
        pathname: PARAMS_ROUTE.SEARCH,
      },
    },
  ];

  return (
    <>
      <ButtonBreadCrumbs
        breadlist={DASHBOARD_CRUMB.PATIENTS.ALIGN}
        topBar={topBar}
      />

      <MuiClassicTable
        rows={patientTbData}
        colObj={DASHBOARD_TBCOL.alignPatient()}
        actionList={(row) => alignPt_mnlst(listenerBox(row))}
        placeholder={placeholderDetails}
      />

      <DialogBox dialogObj={dialogObj} setDialogObj={setDialogObj} />
    </>
  );
}
