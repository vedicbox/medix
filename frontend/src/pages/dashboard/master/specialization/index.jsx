import ButtonBreadCrumbs from "components/breadcrumb/ButtonBreadCrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { crud_mnlst } from "list/menulist";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useNavigate } from "react-router-dom";
import MuiClassicTable from "components/table/MuiClassicTable";
import {
  useGetAllRolesQuery,
  useUpdateRolePermissionsMutation,
} from "service/auth/roleService";
import { snackbar_slice } from "store/root-reducer/global";
import { SEVERITY_ENUM } from "values/enum";
import { ALERT_MSG } from "values/messages";
import SpecializationDialogBox from "./dialogBox/SpecializationDialog";
import { DASHBOARD_TBCOL } from "list/tableColist";
import { useGetAllSpecsQuery } from "service/sepcsService";

export default function MasterSpecializationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef(null);
  let specializationTbData = [];
  const { data: tbData } = useGetAllSpecsQuery();
  let specsPayload = tbData?.payload || [];

  const handleEdit = (row) => {
    console.log(row);
    const navigateObj = {
      _id: row._id,
      name: row.name,
      status: Number(row.status),
    };
    navigate(PARAMS_ROUTE.EDIT, { state: navigateObj });
  };
  const listenerBox = (row) => {
    return {
      edit: () => handleEdit(row),
    };
  };

  const handleSubmit = async () => {
    const formData = formRef.current.prepareData();
    if (!formData.roleId) {
      dispatch(
        snackbar_slice({
          severity: SEVERITY_ENUM.ERROR,
          msg: ALERT_MSG.SPECS_SELECT,
        })
      );
      return;
    }
  };

  const topBar = [
    {
      label: "Create Specs",
      icon: "basil:add-solid",
      link: {
        pathname: PARAMS_ROUTE.CREATE,
      },
    },
  ];
  
  
  return (
    <>
      <ButtonBreadCrumbs
        breadlist={DASHBOARD_CRUMB.SPECIALIZATION.MANAGE}
        topBar={topBar}
      />
      <MuiClassicTable
        rows={specsPayload}
        colObj={DASHBOARD_TBCOL.specialization()}
        actionList={(row) => crud_mnlst(listenerBox(row))}
      />
      <SpecializationDialogBox />
    </>
  );
}
