import MuiClassicTable from "components/table/MuiClassicTable";
import { GLOBAL_TBCOL } from "list/tableColist";

export default function RoleListView(props) {
  const {
    rows = [],
    actionBox,
    selectedRole,
    setSelectedRole,
    roleColPicker,
  } = props;

  const colObj = {
    selectedRow: selectedRole,
    onChange: setSelectedRole,
  };

  return (
    <>
      <MuiClassicTable
        rows={rows}
        colObj={GLOBAL_TBCOL[roleColPicker](colObj)}
        actionList={(row) => actionBox(row)}
      />
    </>
  );
}
