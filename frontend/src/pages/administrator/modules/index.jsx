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
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  img: PLACEHOLDER_IMG.NO_PATIENTS_ALIGN,
  heading: PLACEHOLDER_MSG.NO_PATIENTS_ALIGN,
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
            colObj={ADMINSTRATOR_TBCOL.MODULE}
            actionList={(row) => crud_mnlst(listenerBox(row))}
          />
        </Grid>
      </Grid>
    </>
  );
}
