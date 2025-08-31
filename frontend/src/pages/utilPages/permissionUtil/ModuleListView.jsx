import { Paper } from "@mui/material";
import MuiClassicTable from "components/table/MuiClassicTable";
import { ADMINSTRATOR_TBCOL } from "list/tableColist";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFindAllModuleQuery } from "service/adminstrator/moduleService";

// Main Component
const ModuleListView = (props) => {
  const { setSelectedRows, selectedRows } = props;

  const [filterModule, setFilterModule] = useState([]);
  const userPermission = useSelector(
    (state) => state.auth.user?.roleRef?.permission ?? []
  );

  const { data: moduleData } = useFindAllModuleQuery();
  let modulePayload = moduleData?.payload || [];

  const getFilterModule = () => {
    if (userPermission[0] === "0") return modulePayload;

    return modulePayload
      .filter((module) => userPermission.includes(module._id))
      .map((module) => ({
        ...module,
        subModules: module.subModules.filter((subModule) =>
          userPermission.includes(subModule.uuid)
        ),
      }));
  };

  useEffect(() => {
    setFilterModule(getFilterModule());
  }, [moduleData]);

  const colObj = {
    setSelectedRows,
    selectedRows,
  };

  return (
    <Paper variant="outlined">
      <MuiClassicTable
        rows={filterModule}
        colObj={ADMINSTRATOR_TBCOL.modulePermission(colObj)}
      />
    </Paper>
  );
};

export default memo(ModuleListView);
