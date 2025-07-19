import { lazy } from "react";
import { APP_BAR_ENUM, ROUTE_MODE_ENUM } from "values/enum";
import Loadable from "./Loadable";
import Middleware from "./middleware";
import { AUTH_ROUTE, PARAMS_ROUTE } from "./routeurl";

const SignInPage = Loadable(lazy(() => import("pages/auth/login")));
const DashboardPage = Loadable(lazy(() => import("pages/dashboard")));
const PageNotFoundPage = Loadable(
  lazy(() => import("pages/other/PageNotFound"))
);
const PatientDashboardPage = Loadable(
  lazy(() => import("pages/patientBoard"))
);

export const routelist = [
  {
    path: AUTH_ROUTE.LOGIN,
    element: (
      <Middleware
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
    element: <Middleware baseProps={{ element: DashboardPage }} />,
  },
  {
    path:
      PARAMS_ROUTE.PATIENT +
      "/" +
      PARAMS_ROUTE.HOLDER +
      "/" +
      PARAMS_ROUTE.WILD_CARD,
    element: <Middleware baseProps={{ element: PatientDashboardPage, navigateVal: -2 }} />,
  },
  {
    path: PARAMS_ROUTE.WILD_CARD,
    element: <PageNotFoundPage />,
  },
];
