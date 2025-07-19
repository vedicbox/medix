import { DASHBOARD_ROUTE } from "routes/routeurl";
import { ID_MAPPING } from "service/config/permissionlist";

export const dashboard_navigation = () => {
  return [
    {
      name: "Dashboard",
      index: true,
      path: DASHBOARD_ROUTE.INDEX,
      icon: "mdi-light:view-dashboard",
      uuid: ID_MAPPING.dashboard.uuid,
    },
    {
      name: "Patients",
      icon: "covid:covid19-virus-patient-2",
      uuid: ID_MAPPING.patient.uuid,
      children: [
        {
          name: "Align",
          uuid: ID_MAPPING.patient.align.uuid,
          icon: "streamline-pixel:interface-essential-waiting-hourglass-loading",
          path: DASHBOARD_ROUTE.PATIENT.ALIGN,
        },
      ],
    },
    {
      name: "Staff",
      icon: "fluent:people-team-20-regular",
      uuid: ID_MAPPING.staff.uuid,
      children: [
        {
          uuid: ID_MAPPING.staff.management.uuid,
          name: "Management",
          icon: "carbon:id-management",
          path: DASHBOARD_ROUTE.STAFF.MANAGE,
        },
      ],
    },
    // {
    //   uuid: ID_MAPPING.finance.uuid,
    //   name: "Finance",
    //   icon: "material-symbols:finance-sharp",
    //   children: [
    //     {
    //       name: "Board",
    //       icon: "logos:gitboard",
    //       path: DASHBOARD_ROUTE.FINANCE.BOARD,
    //     },
    //   ],
    // },
    {
      uuid: ID_MAPPING.master.uuid,
      name: "Master",
      icon: "hugeicons:master-card",
      children: [
        {
          name: "Roles",
          icon: "eos-icons:role-binding-outlined",
          path: DASHBOARD_ROUTE.MASTER.ROLES,
        },
      ],
    },
  ];
};

