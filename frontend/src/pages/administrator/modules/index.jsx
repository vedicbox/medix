import { crumbChild } from "list/crumb-list/crumbChild";
import { Grid } from "@mui/material";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import CRUMB_NAV from "list/crumb-list/crumbNav";
import { crud_mnlst } from "list/menulist";
import { ADMINSTRATOR_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFindAllModuleQuery } from "service/adminstrator/moduleService";
import { formatMsg } from "utils/security/validation";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_MOUDLE,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "module" }),
};

export default function ModulePage() {
  const navigate = useNavigate();
  const { data: moduleData } = useFindAllModuleQuery();
  let modulePayload = moduleData?.payload || [];

  const handleEdit = (row) => {
    navigate(PARAMS_ROUTE.EDIT, {
      state: { row },
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
        breadlist={CRUMB_NAV.module.index}
        topBar={crumbChild.create}
      />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <MuiClassicTable
            rows={modulePayload}
            colObj={ADMINSTRATOR_TBCOL.module()}
            actionList={(row) => crud_mnlst(listenerBox(row))}
            placeholder={placeholderDetails}
          />
        </Grid>
      </Grid>
    </>
  );
}
