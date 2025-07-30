import authRoute from "./auth/authRoute.js";
import roleRoute from "./auth/roleRoute.js";
import clinicRoute from "./master/clinicRoute.js";
import staffRoute from "./staffRoute.js";
import moduleRoute from "./moduleRoute.js";
import patientRoute from "./patientRoute.js";
import publishFilesRoute from "./PublishFilesRoute.js";

// API routes
const routelist = [
  { path: "/auth", route: authRoute },
  { path: "/roles", route: roleRoute },
  { path: "/clinic", route: clinicRoute },
  { path: "/staff", route: staffRoute },
  { path: "/patient", route: patientRoute },
  { path: "/publish", route: publishFilesRoute },
  { path: "/module", route: moduleRoute },
];

export default routelist;
