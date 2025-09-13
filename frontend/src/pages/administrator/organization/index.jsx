import { Grid } from "@mui/material";
import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiClassicTable from "components/table/MuiClassicTable";
import { crumbChild } from "list/crumb-list/crumbChild";
import CRUMB_NAV from "list/crumb-list/crumbNav";
import { org_mnlst } from "list/menulist";
import { ADMINSTRATOR_TBCOL } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFindAllOrgQuery } from "service/adminstrator/orgService";
import { formatMsg } from "utils/security/validation";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

const placeholderDetails = {
  src: PLACEHOLDER_IMG.NO_ORG,
  text: formatMsg(PLACEHOLDER_MSG.EMPTY, { label: "organization" }),
};

export default function OrgPage() {
  const navigate = useNavigate();
  const { data: orgData } = useFindAllOrgQuery();
  let orgObj = orgData?.payload || [];

  const handleEdit = (row) => {
    navigate(PARAMS_ROUTE.EDIT, {
      state: { orgId: row._id },
    });
  };

  const handlePermission = (row) => {
    navigate(PARAMS_ROUTE.PERMISSION, {
      state: { orgId: row._id },
    });
  };

  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
      permission: () => handlePermission(row),
    };
  };

  return (
    <>
      <ButtonBreadCrumbs
        breadlist={CRUMB_NAV.adminstrator.org.index}
        topBar={crumbChild.create}
      />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <MuiClassicTable
            rows={orgObj}
            colObj={ADMINSTRATOR_TBCOL.org()}
            actionList={(row) => org_mnlst(listenerBox(row))}
            placeholder={placeholderDetails}
          />
        </Grid>
      </Grid>
    </>
  );
}
