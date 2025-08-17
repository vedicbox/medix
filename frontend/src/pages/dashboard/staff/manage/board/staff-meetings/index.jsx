import { crud_mnlst } from "list/menulist";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
//import { useAssignMeetingMutation, useFetchMeetingTabListQuery } from "service/staffService";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useFetchTbStaffMeetingQuery } from "service/staffMeetingService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_CLINIC,
  text: PLACEHOLDER_MSG.NO_CLINIC,
};

export default function StaffMeeting() {
  const state = useLocation()?.state || {};
  const formRef = useRef();
  const navigate = useNavigate();

  const { data: tbData } = useFetchTbStaffMeetingQuery();

  const meetinglist = tbData?.payload || [];

  //const [assignMeetingEndPoint] = useAssignMeetingMutation();

  const handleEditAction = (row) => {
    navigate(PARAMS_ROUTE.EDIT, { state: { staffId: row.id } });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEditAction(row),
    };
  };

  const topBar = [
    {
      label: "Add Meeting",
      icon: "basil:add-solid",
      link: {
        pathname: PARAMS_ROUTE.CREATE,
        stateDat: state
      },
    },
  ];

  return (
    <div className="mt-3">
      <ButtonBreadCrumbs
        breadlist={DASHBOARD_CRUMB.MASTER.CLINIC.INDEX}
        topBar={topBar}
      />

      <MuiClassicTable
        rows={meetinglist}
        colObj={DASHBOARD_TBCOL.staffMeeting()}
        actionList={(row) => crud_mnlst(listenerBox(row))}
        placeholder={placeholderDetails}
      />
    </div>
  );
}
