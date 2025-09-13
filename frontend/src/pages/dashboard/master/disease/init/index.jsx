import { Grid } from "@mui/material";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import CRUMB_NAV, { MASTER_CRUMB } from "list/crumb-list/crumbNav";
import { crud_mnlst } from "list/menulist";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { ROUTE_PARAMS } from "routes/segment/routeSegment";
import { useGetAllDiseasesQuery } from "service/master/diseaseService";
import { formatMsg } from "utils/security/validation";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_MOUDLE,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "module" }),
};

export default function InitDisease() {
  const navigate = useNavigate();
  const { data: diseaseData } = useGetAllDiseasesQuery();
  let diseasePayload = diseaseData?.payload || [];

  const handleEdit = (row) => {
    navigate(PARAMS_ROUTE.UPDATE, {
      state: { row },
    });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
    };
  };

  const topBar = [
    {
      label: "Create Disease",
      icon: "basil:add-solid",
      link: {
        pathname: ROUTE_PARAMS.create,
        state: {
          index: 0,
        },
      },
    },
  ];

  return (
    <>
      <div className="mt-3">
        <ButtonBreadCrumbs
          breadlist={CRUMB_NAV.master.disease.index}
          topBar={topBar}
        />
      </div>

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <MuiClassicTable
            rows={diseasePayload}
            colObj={DASHBOARD_TBCOL.disease()}
            actionList={(row) => crud_mnlst(listenerBox(row))}
            placeholder={placeholderDetails}
          />
        </Grid>
      </Grid>
    </>
  );
}
