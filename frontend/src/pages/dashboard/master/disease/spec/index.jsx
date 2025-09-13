import { Grid } from "@mui/material";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import CRUMB_NAV, { MASTER_CRUMB } from "list/crumb-list/crumbNav";
import { crud_mnlst } from "list/menulist";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { MASTER_DLROUTE } from "routes/panel-list/dialogRoutelist";
import DialogRoute from "routes/panel/DialogRoutePanel";
import { ROUTE_PARAMS } from "routes/segment/routeSegment";
import { useGetAllSpecsQuery } from "service/master/specService";
import { formatMsg } from "utils/security/validation";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_MOUDLE,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "Specialization" }),
};

export default function InitSpecialization() {
  const navigate = useNavigate();
  const { data: diseaseData } = useGetAllSpecsQuery();
  let diseasePayload = diseaseData?.payload || [];

  const handleEdit = (row) => {
    navigate(ROUTE_PARAMS.update, {
      state: { row, index: 1 },
    });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
    };
  };

  const topBar = [
    {
      label: "Create Specs",
      icon: "basil:add-solid",
      link: {
        pathname: ROUTE_PARAMS.create,
        state: {
          index: 1,
        },
      },
    },
  ];

  return (
    <>
      <div className="mt-3">
        <ButtonBreadCrumbs
          breadlist={CRUMB_NAV.master.specs.index}
          topBar={topBar}
        />
      </div>

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <MuiClassicTable
            rows={diseasePayload}
            colObj={DASHBOARD_TBCOL.specialization()}
            actionList={(row) => crud_mnlst(listenerBox(row))}
            placeholder={placeholderDetails}
          />
        </Grid>
      </Grid>

      <DialogRoute routelist={MASTER_DLROUTE.sepcs} />
    </>
  );
}
