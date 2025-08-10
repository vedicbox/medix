import MuiClassicTable from "components/table/MuiClassicTable";

export default function MuiBasicTable(props) {
  const { rows, colObj, actionList } = props;

  const defaultProps = {
    enableColumnActions: false,
    enableSorting: false,
    enableTopToolbar: false,
    enablePagination: false,
  };

  return (
    <>
      <MuiClassicTable
        rows={rows}
        colObj={colObj}
        actionList={actionList}
        defaultProps={defaultProps}
      />
    </>
  );
}
