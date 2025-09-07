import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moduleService } from "service/adminstrator/moduleService";
import { orgService } from "service/adminstrator/orgService";
import { authService } from "service/auth/authService";
import { roleService } from "service/auth/roleService";
import { clinicService } from "service/clinicService";
import { patientService } from "service/patientService";
import { staffService } from "service/staffService";
import rootReducer from "./root-reducer";
import { specsService } from "service/sepcsService";
import { diseaseService } from "service/diseaseService";

export const store = configureStore({
  reducer: {
    // Custom Reducers
    ...rootReducer,

    // Add the generated reducer as a specific top-level slice
    [authService.reducerPath]: authService.reducer,
    [roleService.reducerPath]: roleService.reducer,
    [staffService.reducerPath]: staffService.reducer,
    [patientService.reducerPath]: patientService.reducer,
    [moduleService.reducerPath]: moduleService.reducer,
    [clinicService.reducerPath]: clinicService.reducer,
    [orgService.reducerPath]: orgService.reducer,
    [specsService.reducerPath]:specsService.reducer,
    [diseaseService.reducerPath]:diseaseService.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authService.middleware,
      staffService.middleware,
      roleService.middleware,
      patientService.middleware,
      moduleService.middleware,
      clinicService.middleware,
      orgService.middleware,
      specsService.middleware,
      diseaseService.middleware
    ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
