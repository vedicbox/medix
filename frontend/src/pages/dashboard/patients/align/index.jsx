import DataViewTemplate from "components/template/dataView";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { alignPt_mnlst } from "list/menulist";
import { DASHBOARD_HEADER } from "list/tableColist";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFetchAlignPatientQuery } from "service/patientService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";
import DialogBox from "./dialogBox";

const placeholderDetails = {
  img: PLACEHOLDER_IMG.NO_PATIENTS_ALIGN,
  heading: PLACEHOLDER_MSG.NO_PATIENTS_ALIGN,
};

export default function ManagePatient() {
  const navigate = useNavigate();
  const [dialogObj, setDialogObj] = useState({});

  const { data: alignPtlist } = useFetchAlignPatientQuery();

  const handleDialogStatus = (row) => {
    setDialogObj(row);
    navigate(PARAMS_ROUTE.MOVE);
  };

  const listenerBox = (row) => {
    return {
      move: () => handleDialogStatus(row),
    };
  };

  const topBar = [
    {
      label: "Consult",
      icon: "icon-park-twotone:appointment",
      link: {
        pathname: PARAMS_ROUTE.SEARCH,
      },
    },
  ];

  return (
    <>
      <DataViewTemplate
        header={DASHBOARD_HEADER.PATIENTS.ALIGN}
        rows={alignPtlist?.payload || []}
        placeholderDetails={placeholderDetails}
        actionList={(row) => alignPt_mnlst(listenerBox(row))}
        breadlist={DASHBOARD_CRUMB.PATIENTS.ALIGN}
        topBar={topBar}
      />

      <DialogBox dialogObj={dialogObj} setDialogObj={setDialogObj} />
    </>
  );
}
