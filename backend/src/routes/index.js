import moduleRoute from "./adminstrator/moduleRoute.js";
import orgRoute from "./adminstrator/orgRoute.js";
import authRoute from "./auth/authRoute.js";
import roleRoute from "./auth/roleRoute.js";
import clinicRoute from "./master/clinicRoute.js";
import patientRoute from "./patientRoute.js";
import staffMRoute from "./staff/staffMRoute.js";
// import publishFilesRoute from "./PublishFilesRoute.js";
import diseaseRoute from './master/diseaseRoute.js';
import specsRoute from './master/specsRoute.js';
import staffRoute from "./staff/staffRoute.js";

// API routes
const routelist = [
  { path: "/auth", route: authRoute },
  { path: "/roles", route: roleRoute },
  { path: "/clinic", route: clinicRoute },
  { path: "/staff", route: staffRoute },
  { path: "/staff-meeting", route: staffMRoute },
  { path: "/patient", route: patientRoute },
  // { path: "/publish", route: publishFilesRoute },
  { path: "/module", route: moduleRoute },
  { path: "/org", route: orgRoute },
  { path: "/specs", route: specsRoute },
  { path: "/disease", route: diseaseRoute },
];

export default routelist;
