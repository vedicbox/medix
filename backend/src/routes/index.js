import authRoute from "./auth/authRoute.js";
import roleRoute from "./auth/roleRoute.js";
import moduleRoute from "./moduleRoute.js";
import patientRoute from "./patientRoute.js";
import staffRoute from "./staffRoute.js";

// API routes
const routelist = [
  { path: "/auth", route: authRoute },
  { path: "/roles", route: roleRoute },
  { path: "/staff", route: staffRoute },
  { path: "/patient", route: patientRoute },
  { path: "/module", route: moduleRoute },
];

export default routelist;
