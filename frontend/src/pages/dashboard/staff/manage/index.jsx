import DataViewTemplate from "components/template/dataView";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { staff_mnlst } from "list/menulist";
import { DASHBOARD_HEADER } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFetchTbStaffQuery } from "service/staffService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  img: PLACEHOLDER_IMG.NO_STAFF,
  heading: PLACEHOLDER_MSG.NO_STAFF,
};

export default function StaffManagePage() {
  const navigate = useNavigate();

  const { data: tbData } = useFetchTbStaffQuery();
  let staffTbData = tbData?.payload?.stafflist || [];


  const handleEdit = (row) => {
    navigate(PARAMS_ROUTE.EDIT, {
      state: { userId: row.userRef._id, staffId: row._id },
    });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
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
      <DataViewTemplate
        header={DASHBOARD_HEADER.STAFF.MANAGE}
        rows={staffTbData}
        actionList={(row) => staff_mnlst(listenerBox(row))}
        placeholderDetails={placeholderDetails}
        breadlist={DASHBOARD_CRUMB.STAFF.MANAGE}
        topBar={topBar}
      />
    </>
  );
}
