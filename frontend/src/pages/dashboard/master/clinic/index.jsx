import { ROUTE_PARAMS } from "routes/segment/routeSegment";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { crumbChild } from "list/crumb-list/crumbChild";
import CRUMB_NAV from "list/crumb-list/crumbNav";
import { crud_mnlst } from "list/menulist";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { useFetchAllClinicsQuery } from "service/master/clinicService";
import { formatMsg } from "utils/security/validation";
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
    navigate(ROUTE_PARAMS.update, {
      state: { clinicId: row._id },
    });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
    };
  };

  return (
    <>
      <ButtonBreadCrumbs
        breadlist={CRUMB_NAV.master.clinic.index}
        topBar={crumbChild.create}
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
