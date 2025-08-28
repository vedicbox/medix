import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { staff_mnlst } from "list/menulist";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE, PARAMS_ROUTE } from "routes/routeurl";
import { useFetchAllStaffQuery } from "service/staffService";
import { formatMsg } from "utils/security/validation";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_STAFF,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "staff" }),
};

export default function StaffManagePage() {
  const navigate = useNavigate();

  const { data: tbData } = useFetchAllStaffQuery();
  let staffTbData = tbData?.payload?.stafflist || [];

  const handleEdit = (row) => {
    navigate(PARAMS_ROUTE.EDIT, {
      state: { userId: row.userRef._id, staffId: row._id },
    });
  };

  const handleBoard = (row) => {
    navigate(DASHBOARD_ROUTE.STAFF.BOARD.PARAM, {
      state: { userId: row.userRef._id, staffId: row._id },
    });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
      board: () => handleBoard(row),
    };
  };

  const topBar = [
    {
      label: "Enroll Staff",
      icon: "basil:add-solid",
      link: {
        pathname: PARAMS_ROUTE.ENROLL,
      },
    },
  ];

  return (
    <>
      <ButtonBreadCrumbs
        breadlist={DASHBOARD_CRUMB.STAFF.MANAGE}
        topBar={topBar}
      />

      <MuiClassicTable
        rows={staffTbData}
        colObj={DASHBOARD_TBCOL.staff()}
        actionList={(row) => staff_mnlst(listenerBox(row))}
        placeholder={placeholderDetails}
      />
    </>
  );
}
