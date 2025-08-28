import { ADMINISTRATOR_ROUTE, DASHBOARD_ROUTE, PARAMS_ROUTE } from "routes/routeurl";
import { DASH_TAG, PT_TAG } from "config/module/tags";
import { parseModuleTag } from "utils/parse";
import { ICON_NAME } from "values/img-links";

export const dashboard_navigation = () => {
  return [
    {
      name: parseModuleTag(DASH_TAG.DASHBOARD).name,
      uuid: parseModuleTag(DASH_TAG.DASHBOARD).uuid,
      index: true,
      path: DASHBOARD_ROUTE.INDEX,
      icon: ICON_NAME.DASHBOARD,
    },
    {
      name: parseModuleTag(DASH_TAG.PATIENT).name,
      uuid: parseModuleTag(DASH_TAG.PATIENT).uuid,
      icon: ICON_NAME.HEART_OUTLINE,
      children: [
        {
          name: parseModuleTag(DASH_TAG.ALIGN_PT).name,
          uuid: parseModuleTag(DASH_TAG.ALIGN_PT).uuid,
          icon: ICON_NAME.WAITLIST,
          path: DASHBOARD_ROUTE.PATIENT.ALIGN,
        },
      ],
    },
    {
      name: parseModuleTag(DASH_TAG.STAFF).name,
      uuid: parseModuleTag(DASH_TAG.STAFF).uuid,
      icon: ICON_NAME.TEAMS,
      children: [
        {
          uuid: parseModuleTag(DASH_TAG.STAFF_MANAGE).uuid,
          name: parseModuleTag(DASH_TAG.STAFF_MANAGE).name,
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
      uuid: parseModuleTag(DASH_TAG.MASTER).uuid,
      name: parseModuleTag(DASH_TAG.MASTER).name,
      icon: ICON_NAME.MASTER,
      children: [
        {
          name: parseModuleTag(DASH_TAG.ROLE_MASTER).name,
          uuid: parseModuleTag(DASH_TAG.ROLE_MASTER).uuid,
          icon: ICON_NAME.ROLE,
          path: DASHBOARD_ROUTE.MASTER.ROLES,
        },
        {
          name: parseModuleTag(DASH_TAG.CLINIC_MASTER).name,
          uuid: parseModuleTag(DASH_TAG.CLINIC_MASTER).uuid,
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
      name: "Update",
      uuid: parseModuleTag(PT_TAG.UPDATE).uuid,
      icon: ICON_NAME.UPDATE,
      path: `${PARAMS_ROUTE.UPDATE}`,
    },
  ];
};

export const administrator_nav = () => {
  return [
    {
      index: true,
      name: "Overview",
      path: ADMINISTRATOR_ROUTE.INDEX,
      icon: ICON_NAME.DASHBOARD,
    },
    {
      name: "Organization",
      icon: ICON_NAME.ORG,
      path: ADMINISTRATOR_ROUTE.ORG.PATH,
    },
    {
      name: "Module",
      icon: ICON_NAME.NAV_MODULE,
      path: ADMINISTRATOR_ROUTE.MODULES.PATH,
    }
  ]
}