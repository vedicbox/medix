import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import CRUMB_NAV, { MASTER_CRUMB } from "list/crumb-list/crumbNav";
import { crud_mnlst } from "list/menulist";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { STAFF_DLROUTE } from "routes/panel-list/dialogRoutelist";
import DialogRoute from "routes/panel/DialogRoutePanel";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFetchAllStaffMeetingsQuery } from "service/staff/staffMService";
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

  console.log(state.staffId);
  const { data: tbData } = useFetchAllStaffMeetingsQuery({
    staffId: state.staffId,
  });

  const meetinglist = tbData?.payload || [];

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
        state,
      },
    },
  ];

  return (
    <div className="mt-3">
      <ButtonBreadCrumbs
        breadlist={CRUMB_NAV.master.clinic.index}
        topBar={topBar}
      />

      <MuiClassicTable
        rows={meetinglist}
        colObj={DASHBOARD_TBCOL.staffMeeting()}
        actionList={(row) => crud_mnlst(listenerBox(row))}
        placeholder={placeholderDetails}
      />

      <DialogRoute routelist={STAFF_DLROUTE.staffMeeting} />
    </div>
  );
}
