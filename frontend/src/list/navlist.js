import { ADMINISTRATOR_ROUTE, DASHBOARD_ROUTE } from "routes/routeurl";
import { ID_MAPPING } from "service/config/permissionlist";
import { ICON_NAME } from "values/img-links";
import { PARAMS_ROUTE } from "routes/routeurl";

export const dashboard_navigation = () => {
  return [
    {
      name: "Dashboard",
      index: true,
      path: DASHBOARD_ROUTE.INDEX,
      icon: ICON_NAME.DASHBOARD,
      uuid: ID_MAPPING.dashboard.uuid,
    },
    {
      name: "Patients",
      icon: ICON_NAME.HEART_OUTLINE,
      uuid: ID_MAPPING.patient.uuid,
      children: [
        {
          name: "Align",
          uuid: ID_MAPPING.patient.align.uuid,
          icon: ICON_NAME.WAITLIST,
          path: DASHBOARD_ROUTE.PATIENT.ALIGN,
        },
      ],
    },
    {
      name: "Staff",
      icon: ICON_NAME.TEAMS,
      uuid: ID_MAPPING.staff.uuid,
      children: [
        {
          uuid: ID_MAPPING.staff.management.uuid,
          name: "Management",
          icon: ICON_NAME.MANAGEMENT,
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
      icon: ICON_NAME.MASTER,
      children: [
        {
          name: "Roles",
          icon: ICON_NAME.ROLE,
          path: DASHBOARD_ROUTE.MASTER.ROLES,
        },
        {
          name: "Clinic",
          icon: ICON_NAME.CLINIC,
          path: DASHBOARD_ROUTE.MASTER.CLINIC,
        },
      ],
    },
  ];
};

export const patientboard_navigation = () => {
  return [
    {
      name: "Update Patient",
      icon: ICON_NAME.UPDATE,
      uuid: ID_MAPPING.patient.uuid,
      path: PARAMS_ROUTE.UPDATE,
    },
  ];
};

export const administrator_nav = () => {
  return [
    {
      name: "Workspace",
      icon: ICON_NAME.MASTER,
      path: ADMINISTRATOR_ROUTE.WORKSPACE.PATH,
    },
    {
      name: "Module",
      icon: ICON_NAME.MASTER,
      path: ADMINISTRATOR_ROUTE.MODULES.PATH,
    }
  ]
}