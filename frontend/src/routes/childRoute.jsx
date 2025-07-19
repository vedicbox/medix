import PropTypes from "prop-types";
import { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { MASTER_PERMISSION } from "service/config/permissionlist";

// Memoized selector outside the component
const selectPermissions = (state) => state.auth.user?.roleRef?.permission ?? [];

const ChildRoutes = ({ routelist }) => {
  // Using memoized selector with shallowEqual comparison
  const permissions = useSelector(selectPermissions, shallowEqual);

  // Memoize admin access check
  const hasAdminAccess = useMemo(
    () => permissions.includes(MASTER_PERMISSION.ADMIN),
    [permissions]
  );

  // Memoize route filtering
  const allowedRoutes = useMemo(
    () =>
      hasAdminAccess
        ? routelist
        : routelist.filter((route) => permissions.includes(route.uuid)),
    [routelist, permissions, hasAdminAccess]
  );

  return (
    <Routes>
      {allowedRoutes.map((childObj) => (
        <Route
          key={`route-${childObj.uuid || childObj.path}`}
          path={childObj.path}
          element={childObj.element}
        />
      ))}
    </Routes>
  );
};

ChildRoutes.propTypes = {
  routelist: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      path: PropTypes.string.isRequired,
      element: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default ChildRoutes;
