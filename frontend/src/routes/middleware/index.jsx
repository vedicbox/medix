import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import BaseWrapper from "routes/BaseWrapper";
import { AUTH_ROUTE, PARAMS_ROUTE } from "routes/routeurl";
import { ROUTE_MODE_ENUM } from "values/enum";

function MiddlewareRoute(props) {
  const { baseProps, authMode } = props;

  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);

  let location = useLocation();

  if (authMode == ROUTE_MODE_ENUM.AUTH && isAuthenticate) {
    return (
      <Navigate to={PARAMS_ROUTE.INDEX} state={{ from: location }} replace />
    );
  }

  if (!isAuthenticate && authMode != ROUTE_MODE_ENUM.AUTH) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate to={AUTH_ROUTE.LOGIN} state={{ from: location }} replace />
    );
  }

  return <BaseWrapper baseProps={baseProps} />;
}

export default MiddlewareRoute;
