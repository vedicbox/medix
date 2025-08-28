import { formatMsg } from "utils/security/validation";
import { PLACEHOLDER_MSG } from "values/messages";
import { Button, Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import Iconify from "components/icons/Iconify";
import MuiClassicTable from "components/table/MuiClassicTable";
import { ADMINSTRATOR_CRUMB } from "list/breadcrumb-list";
import { crud_mnlst } from "list/menulist";
import { ADMINSTRATOR_TBCOL } from "list/tableColist";
import { NavLink, useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFindAllModuleQuery } from "service/adminstrator/moduleService";
import { ICON_NAME, PLACEHOLDER_IMG } from "values/img-links";

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
      <CollapsedBreadcrumbs breadlist={ADMINSTRATOR_CRUMB.MODULE.INDEX}>
        <Button
          variant="outlined"
          startIcon={<Iconify icon={ICON_NAME.ADD_NEW} />}
          component={NavLink}
          to={PARAMS_ROUTE.CREATE}
          className="elevation1"
        >
          Create
        </Button>
      </CollapsedBreadcrumbs>

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
