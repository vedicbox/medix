import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/childRoute";
import { DASHBOARD_ROUTE, PARAMS_ROUTE } from "routes/routeurl";
import { ID_MAPPING } from "service/config/permissionlist";
import { useChangeAlignPtStatusMutation } from "service/patientService";
import { HTTP_STATUS_CODES, PATENT_JOURNEY } from "values/enum";
import MovePage from "./MovePage";
import SearchPage from "./SearchPage";
import { ICON_NAME } from "values/img-links";

// Memoized dialog container
const WrapContainer = React.memo(function WrapContainer({
  title,
  actionContainer,
  children,
  onClose,
}) {
  return (
    <ClassicDialog
      open={true}
      title={title}
      handleToggle={onClose}
      actionContainer={actionContainer}

    >
      {children}
    </ClassicDialog>
  );
});

export default function DialogBox({ dialogObj, setDialogObj }) {
  const navigate = useNavigate();
  const [changePtStatus] = useChangeAlignPtStatusMutation();

  const handleClose = useCallback(() => {
    setDialogObj({});
    navigate(-1);
  }, [setDialogObj, navigate]);

  const handleNewPatient = useCallback(() => {
    navigate(`/${DASHBOARD_ROUTE.PATIENT.ENROLL}`);
  }, [navigate]);

  const handlePtStatus = useCallback(async () => {
    const packet = {
      alignPatientId: dialogObj._id,
      status: PATENT_JOURNEY.COMPLETE,
    };
    const { data } = await changePtStatus(packet);
    if (data?.status === HTTP_STATUS_CODES.OK) navigate(-1);
  }, [changePtStatus, dialogObj?._id, navigate]);

  const searchAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.CREATE} />}
      onClick={handleNewPatient}
    >
      Add New
    </Button>
  );

  const moveAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.CREATE} />}
      onClick={handlePtStatus}
    >
      Submit
    </Button>
  );

  const routelist = useMemo(
    () => [
      {
        path: PARAMS_ROUTE.SEARCH,
        uuid: ID_MAPPING.patient.uuid,
        element: (
          <WrapContainer
            actionContainer={searchAction}
            title="Search"
            onClose={handleClose}
          >
            <SearchPage />
          </WrapContainer>
        ),
      },
      {
        path: PARAMS_ROUTE.MOVE,
        uuid: ID_MAPPING.patient.uuid,
        element: (
          <WrapContainer
            actionContainer={moveAction}
            title="What's Next"
            onClose={handleClose}
          >
            <MovePage />
          </WrapContainer>
        ),
      },
    ],
    [searchAction, moveAction, handleClose]
  );

  return <ChildRoutes routelist={routelist} />;
}
