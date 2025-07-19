import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authService } from "service/auth/authService";
import { roleService } from "service/auth/roleService";
import { patientService } from "service/patientService";
import { staffService } from "service/staffService";
import rootReducer from "./root-reducer";

export const store = configureStore({
  reducer: {
    // Custom Reducers
    ...rootReducer,

    // Add the generated reducer as a specific top-level slice
    [authService.reducerPath]: authService.reducer,
    [roleService.reducerPath]: roleService.reducer,
    [staffService.reducerPath]: staffService.reducer,
    [patientService.reducerPath]: patientService.reducer,
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
      patientService.middleware
    ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
