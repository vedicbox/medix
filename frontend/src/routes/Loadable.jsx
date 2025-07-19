import { Suspense } from "react";
import AppMarkLoader from "components/loader/AppMarkLoader";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<AppMarkLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
