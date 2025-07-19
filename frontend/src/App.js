import AppMarkLoader from "components/loader/AppMarkLoader";
import DisplayContent from "components/placeholder/DisplayContent";
import { useSelector } from "react-redux";
import { useAuthCheckQuery } from "service/auth/authService";
import Router from "./routes";

function App() {
  // Call the auth check query
  const { isError } = useAuthCheckQuery();

  // Check if the authentication state is ready
  const isStateReady = useSelector((state) => state.auth.isAuthenticate);

  // Determine whether the app is ready for rendering content
  const isReady = isStateReady !== undefined;

  return (
    <DisplayContent valid1={isReady || isError} content={<AppMarkLoader />}>
      <Router />
    </DisplayContent>
  );
}

export default App;
