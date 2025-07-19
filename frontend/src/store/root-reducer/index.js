import auth from "./auth";
import global from "./global";
import patient from "./patient";

// ==============================|| COMBINE REDUCERS ||============================== //

const rootReducer = {
  auth,
  global,
  patient,
};

export default rootReducer;
