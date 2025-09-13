import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { crumbChild } from "list/crumb-list/crumbChild";
import CRUMB_NAV from "list/crumb-list/crumbNav";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { formatMsg } from "utils/security/validation";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_PATIENTS_ALIGN,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "queue" }),
};

export default function PatientQueue() {
  return (
    <>
      <ButtonBreadCrumbs
        breadlist={CRUMB_NAV.dashboard.addToQueue}
      
      />

      <MuiClassicTable
        rows={[]}
        colObj={DASHBOARD_TBCOL.alignPatient()}
        placeholder={placeholderDetails}
      />
    </>
  );
}
