import { Grid } from "@mui/material";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { ADMINSTRATOR_CRUMB } from "list/breadcrumb-list";
import { crud_mnlst } from "list/menulist";
import { ADMINSTRATOR_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFindAllOrgQuery } from "service/adminstrator/orgService";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_PATIENTS_ALIGN,
  text: PLACEHOLDER_MSG.NO_PATIENTS_ALIGN,
};

export default function WorkspacePage() {
  const navigate = useNavigate();
  const { data: orgData } = useFindAllOrgQuery();
  let orgObj = orgData?.payload || [];

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

  const topBar = [
    {
      label: "Create",
      icon: "basil:add-solid",
      link: {
        pathname: PARAMS_ROUTE.CREATE,
      },
    },
  ];

  return (
    <>
      <ButtonBreadCrumbs
        breadlist={ADMINSTRATOR_CRUMB.WORKSPACE.INDEX}
        topBar={topBar}
      />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <MuiClassicTable
            rows={orgObj}
            colObj={ADMINSTRATOR_TBCOL.workspace()}
            actionList={(row) => crud_mnlst(listenerBox(row))}
            placeholder={placeholderDetails}
          />
        </Grid>
      </Grid>
    </>
  );
}
