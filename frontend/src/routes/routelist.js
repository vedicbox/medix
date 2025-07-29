import { lazy } from "react";
import { APP_BAR_ENUM, ROUTE_MODE_ENUM } from "values/enum";
import Loadable from "./Loadable";
import ParentRouteMiddleware from "./middleware/ParentRouteMid";
import { ADMINISTRATOR_ROUTE, AUTH_ROUTE, PARAMS_ROUTE } from "./routeurl";

const SignInPage = Loadable(lazy(() => import("pages/auth/login")));
const DashboardPage = Loadable(lazy(() => import("pages/dashboard")));
const PageNotFoundPage = Loadable(
  lazy(() => import("pages/other/PageNotFound"))
);
const PatientDashboardPage = Loadable(
  lazy(() => import("pages/patientBoard"))
);
const AdministratorPage = Loadable(
  lazy(() => import("pages/administrator"))
);


export const routelist = [
  {
    path: AUTH_ROUTE.LOGIN,
    element: (
      <ParentRouteMiddleware
        authMode={ROUTE_MODE_ENUM.AUTH}
        baseProps={{
          element: SignInPage,
          barMode: APP_BAR_ENUM.HIDE,
          backDirect: false,
        }}
      />
    ),
  },
  {
    path: PARAMS_ROUTE.INDEX + PARAMS_ROUTE.WILD_CARD,
    element: <ParentRouteMiddleware baseProps={{ element: DashboardPage }} />,
  },
  {
    path: ADMINISTRATOR_ROUTE.INDEX + "/" + PARAMS_ROUTE.WILD_CARD,
    element: <ParentRouteMiddleware baseProps={{ element: AdministratorPage }} />,
  },
  {
    path:
      PARAMS_ROUTE.PATIENT +
      "/" +
      PARAMS_ROUTE.HOLDER +
      "/" +
      PARAMS_ROUTE.WILD_CARD,
    element: <ParentRouteMiddleware baseProps={{ element: PatientDashboardPage, navigateVal: -2, drawerStat: false }} />,
  },
  {
    path: PARAMS_ROUTE.WILD_CARD,
    element: <PageNotFoundPage />,
  },
];
