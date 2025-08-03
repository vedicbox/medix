import DataViewTemplate from "components/template/dataView";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { crud_mnlst } from "list/menulist";
import { DASHBOARD_HEADER } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFetchTbClinicQuery } from "service/clinicService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  img: PLACEHOLDER_IMG.NO_CLINIC,
  heading: PLACEHOLDER_MSG.NO_CLINIC,
};

export default function ClinicMasterPage() {
  const navigate = useNavigate();

  const { data: tbData } = useFetchTbClinicQuery();
  let clinicTbData = tbData?.payload?.clinics || [];

  const handleEdit = (row) => {
    navigate(PARAMS_ROUTE.UPDATE, {
      state: { clinicId: row._id },
    });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
    };
  };

  const topBar = [
    {
      label: "Add Clinic",
      icon: "basil:add-solid",
      link: {
        pathname: PARAMS_ROUTE.CREATE,
      },
    },
  ];

  return (
    <>
      <DataViewTemplate
        header={DASHBOARD_HEADER.MASTER.CLINIC}
        rows={clinicTbData}
        actionList={(row) => crud_mnlst(listenerBox(row))}
        placeholderDetails={placeholderDetails}
        breadlist={DASHBOARD_CRUMB.MASTER.CLINIC.INDEX}
        topBar={topBar}
      />
    </>
  );
}
