import ClassicDialog from "components/dialog/ClassicDialog";
import ValidPermission from "components/placeholder/ValidPermission";
import PropTypes from "prop-types";
import { memo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChildRouteMiddleware from "../middleware/ChildRouteMid";

const DialogContainer = memo(({ title, children, onClose }) => (
  <ClassicDialog open={true} title={title} handleToggle={onClose}>
    {children}
  </ClassicDialog>
));

function DialogRoute({ routelist }) {
  const navigation = useNavigate();

  const handleClose = () => {
    navigation(-1);
  };

  return (
    <Routes>
      {routelist.map((childObj) => (
        <Route
          key={`route-${childObj.uuid || childObj.path}`}
          path={childObj.path}
          element={
            <ValidPermission uuid={childObj.uuid}>
              <DialogContainer title={childObj.baseProps?.title} onClose={handleClose}>
                <ChildRouteMiddleware baseProps={childObj.baseProps} />
              </DialogContainer>
            </ValidPermission>
          }
        />
      ))}
    </Routes>
  );
}

DialogRoute.propTypes = {
  routelist: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      path: PropTypes.string.isRequired,
      baseProps: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default DialogRoute;
