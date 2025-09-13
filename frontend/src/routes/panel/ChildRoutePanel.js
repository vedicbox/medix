import ValidPermission from "components/placeholder/ValidPermission";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import ChildRouteMiddleware from "../middleware/ChildRouteMid";

const ChildRoutes = ({ routelist }) => {
    return (
        <Routes>
            {routelist.map((childObj) => (
                <Route
                    key={`route-${childObj.uuid || childObj.path}`}
                    path={childObj.path}
                    element={
                        <ValidPermission uuid={childObj.uuid}>
                            <ChildRouteMiddleware baseProps={childObj.baseProps} />
                        </ValidPermission>
                    }
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
            baseProps: PropTypes.object.isRequired,
        })
    ).isRequired,
};

export default ChildRoutes;