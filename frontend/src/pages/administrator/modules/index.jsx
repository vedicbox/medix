import { Grid } from "@mui/material";
import ClassicInnerTable from "components/table/innerTable";
import { crud_mnlst } from "list/menulist";
import { ADMINSTRATOR_HEADER } from "list/tableColist";
import { useNavigate } from "react-router-dom";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useFindAllModuleQuery } from "service/adminstrator/moduleService";
import { PLACEHOLDER_IMG } from "values/img-links";
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
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <ClassicInnerTable
            headers={ADMINSTRATOR_HEADER.MODULE}
            rows={modulePayload}
            placeholder={placeholderDetails}
            actionList={(row) => crud_mnlst(listenerBox(row))}
          />
        </Grid>
      </Grid>
    </>
  );
}
