import { clinicService } from "service/master/clinicService";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moduleService } from "service/adminstrator/moduleService";
import { orgService } from "service/adminstrator/orgService";
import { authService } from "service/auth/authService";
import { roleService } from "service/auth/roleService";
import { diseaseService } from "service/master/diseaseService";
import { specService } from "service/master/specService";
import { patientService } from "service/patientService";
import { staffMService } from "service/staff/staffMService";
import { staffService } from "service/staff/staffService";
import rootReducer from "./root-reducer";

export const store = configureStore({
  reducer: {
    // Custom Reducers
    ...rootReducer,

    // Add the generated reducer as a specific top-level slice
    [authService.reducerPath]: authService.reducer,
    [roleService.reducerPath]: roleService.reducer,
    [staffService.reducerPath]: staffService.reducer,
    [staffMService.reducerPath]: staffMService.reducer,
    [patientService.reducerPath]: patientService.reducer,
    [moduleService.reducerPath]: moduleService.reducer,
    [clinicService.reducerPath]: clinicService.reducer,
    [diseaseService.reducerPath]: diseaseService.reducer,
    [specService.reducerPath]: specService.reducer,
    [orgService.reducerPath]: orgService.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authService.middleware,
      staffService.middleware,
      staffMService.middleware,
      roleService.middleware,
      patientService.middleware,
      moduleService.middleware,
      clinicService.middleware,
      diseaseService.middleware,
      specService.middleware,
      orgService.middleware,
    ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
