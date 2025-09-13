import ROUTE_SEG from "routes/segment/routeSegment";
import { Button } from "@mui/material";
import ClassicDialog from "components/dialog/ClassicDialog";
import Iconify from "components/icons/Iconify";
import { DASH_TAG } from "config/module/tags";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ChildRoutes from "routes/panel/ChildRoutePanel";
import { PARAMS_ROUTE } from "routes/routeurl";
import { useChangeAlignPtStatusMutation } from "service/patientService";
import { parseModuleTag } from "utils/parse";
import { HTTP_STATUS_CODES, PATENT_JOURNEY } from "values/enum";
import { ICON_NAME } from "values/img-links";
import MovePage from "./MovePage";
import SearchPage from "./SearchPage";

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
    navigate(ROUTE_SEG.dashboard.create);
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
      startIcon={<Iconify icon={ICON_NAME.ADD_NEW} />}
      onClick={handleNewPatient}
    >
      Add New
    </Button>
  );

  const moveAction = (
    <Button
      variant="contained"
      startIcon={<Iconify icon={ICON_NAME.SUBMIT} />}
      onClick={handlePtStatus}
    >
      Submit
    </Button>
  );

  const routelist = useMemo(
    () => [
      {
        path: PARAMS_ROUTE.SEARCH,
        uuid: parseModuleTag(DASH_TAG.ALIGN_PT).uuid,
        baseProps: {
          element: (
            <WrapContainer
              actionContainer={searchAction}
              title="Search"
              onClose={handleClose}
            >
              <SearchPage />
            </WrapContainer>
          ),
          title: "Search",
        },
      },
      {
        path: PARAMS_ROUTE.MOVE,
        uuid: parseModuleTag(DASH_TAG.ALIGN_PT).uuid,
        baseProps: {
          element: (
            <WrapContainer
              actionContainer={moveAction}
              title="What's Next"
              onClose={handleClose}
            >
              <MovePage />
            </WrapContainer>
          ),
          title: "What's Next",
        },
      },
    ],
    [searchAction, moveAction, handleClose]
  );

  return <ChildRoutes routelist={routelist} />;
}
