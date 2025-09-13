import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { crumbChild } from "list/crumb-list/crumbChild";
import CRUMB_NAV from "list/crumb-list/crumbNav";
import { alignPt_mnlst } from "list/menulist";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useGenerateConsultReceptMutation } from "service/filePublishService";
import { useFetchAlignPatientQuery } from "service/patientService";
import { formatMsg } from "utils/security/validation";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";
import DialogBox from "./dialogBox";
import AddQueueFilterBox from "./filterBox";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_PATIENTS_ALIGN,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "queue" }),
};

export default function AddToQueue() {
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
  return (
    <>
      <ButtonBreadCrumbs
        breadlist={CRUMB_NAV.dashboard.addToQueue}
        topBar={crumbChild.addToQueue}
      />

      <AddQueueFilterBox />

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
