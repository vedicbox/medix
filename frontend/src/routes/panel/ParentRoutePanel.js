import { lazy } from "react";
import { APP_BAR_ENUM, ROUTE_MODE_ENUM } from "values/enum";
import Loadable from "../Loadable";
import ParentRouteMiddleware from "../middleware/ParentRouteMid";
import ROUTE_SEG, { ROUTE_PARAMS } from "../segment/routeSegment";

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
    path: ROUTE_SEG.auth.login,
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
    path: ROUTE_SEG.dashboard.index,
    element: <ParentRouteMiddleware baseProps={{ element: DashboardPage }} />,
  },
  {
    path: ROUTE_SEG.admin.index,
    element: <ParentRouteMiddleware baseProps={{ element: AdministratorPage }} />,
  },
  {
    path: ROUTE_SEG.patient.index,
    element: <ParentRouteMiddleware baseProps={{ element: PatientDashboardPage }} />,
  },
  {
    path: ROUTE_PARAMS.wildcard,
    element: <PageNotFoundPage />,
  },
];
