import { PARAMS_ROUTE } from "routes/routeurl";
import { ICON_NAME } from "values/img-links";

export const profile_mnlst = (listenerBox) => {
  return [
    {
      label: "Home",
      link: {
        pathname: PARAMS_ROUTE.INDEX,
      },
      icon: ICON_NAME.HOME,
    },
    { divider: true },
    {
      label: "Logout",
      icon: ICON_NAME.LOGOUT,
      handler: listenerBox["logout"],
    },
  ];
};

export const staff_mnlst = (listenerBox) => {
  return [
    {
      label: "Edit Form",
      icon: ICON_NAME.EDIT,
      handler: listenerBox["edit"],
    },
    {
      label: "Board",
      icon: "icon-park-outline:setting",
      handler: listenerBox["board"],
    },
  ];
};

export const alignPt_mnlst = (listenerBox) => {
  return [
    {
      label: "Move",
      icon: ICON_NAME.MOVE,
      handler: listenerBox["move"],
    },
    {
      label: "Publish",
      icon: ICON_NAME.PUBLISH,
      handler: listenerBox["publish"],
    },
  ];
};

export const crud_mnlst = (listenerBox) => {
  return [
    {
      label: "Edit",
      icon: ICON_NAME.EDIT,
      handler: listenerBox["edit"],
      hide: !listenerBox["edit"],
    },
    {
      label: "Delete",
      icon: ICON_NAME.DELETE,
      handler: listenerBox["delete"],
      hide: !listenerBox["delete"],
    },
  ];
};

