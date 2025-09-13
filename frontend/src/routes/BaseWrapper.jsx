import { Alert, Snackbar } from "@mui/material";
import BottomNavigation from "components/appbar/BottomAppBar";
import LinearIndeterminate from "components/loader/LinearIndeterminate";
import { switchAppBar } from "components/other/SwitchComp";
import DisplayContent from "components/placeholder/DisplayContent";
import { useDispatch, useSelector } from "react-redux";
import { snackbar_slice } from "store/root-reducer/global";

export default function BaseWrapper(props) {
  const {
    element: WrappedComponent,
    barMode,
    backDirect = true,
    drawerStat,
  } = props.baseProps;

  const dispatch = useDispatch();

  const snackbar = useSelector((state) => state.global.snackbar);
  const serviceloading = useSelector((state) => state.global.serviceloading);

  const closeSnackbar = () => {
    dispatch(snackbar_slice({}));
  };

  return (
    <>
      <DisplayContent valid1={serviceloading}>
        <LinearIndeterminate />
      </DisplayContent>
      {switchAppBar(barMode, drawerStat)}

      <DisplayContent valid1={snackbar.severity}>
        <Snackbar
          open={!!snackbar.severity}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            <p> {snackbar.msg} </p>
          </Alert>
        </Snackbar>
      </DisplayContent>

      <WrappedComponent />
      <BottomNavigation />
    </>
  );
}
