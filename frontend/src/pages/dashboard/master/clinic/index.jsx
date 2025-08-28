import { formatMsg } from "utils/security/validation";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { crud_mnlst } from "list/menulist";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFetchAllClinicsQuery } from "service/clinicService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_CLINIC,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "clinic" }),
};

export default function ClinicFormUtil() {
  const navigate = useNavigate();

  const { data: tbData } = useFetchAllClinicsQuery();
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
      <ButtonBreadCrumbs
        breadlist={DASHBOARD_CRUMB.MASTER.CLINIC.INDEX}
        topBar={topBar}
      />

      <MuiClassicTable
        rows={clinicTbData}
        colObj={DASHBOARD_TBCOL.clinic()}
        actionList={(row) => crud_mnlst(listenerBox(row))}
        placeholder={placeholderDetails}
      />
    </>
  );
}
