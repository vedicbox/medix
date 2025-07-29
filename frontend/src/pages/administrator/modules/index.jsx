import { Grid } from "@mui/material";
import ClassicInnerTable from "components/table/innerTable";
import { ADMINSTRATOR_HEADER } from "list/tableColist";
import { useState } from "react";
import ModuleDialogBox from "./dialogBox";
import { useFindAllModuleQuery } from "service/adminstrator/moduleService";

export default function ModulePage() {
  const [dialogObj, setDialogObj] = useState({});
  
   const { data: moduleData } = useFindAllModuleQuery();
    let modulePayload = moduleData?.payload?.modulelist || [];

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12 }}>
          <ClassicInnerTable
            headers={ADMINSTRATOR_HEADER.MODULE}
            rows={modulePayload}
            placeholder={{}}
          />
        </Grid>
      </Grid>

      <ModuleDialogBox setDialogObj={setDialogObj} dialogObj={dialogObj} />
    </>
  );
}
