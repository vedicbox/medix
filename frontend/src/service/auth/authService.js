import { createApi } from "@reduxjs/toolkit/query/react";
import {
  httpConfig,
  httpMiddlewareBoundary,
  onHttpSuccess,
} from "service/config/httpConfig";
import { authInit_slc } from "store/root-reducer/auth";
import { AUTH_ENDPOINT } from "../config/endpoints";

const AUTH_API_PATH_KEY = "auth-api";

// Define a service using a base URL and expected endpoints
export const authService = createApi({
  reducerPath: AUTH_API_PATH_KEY,
  baseQuery: httpConfig(),
  endpoints: (builder) => ({
    authCheck: builder.query({
      query: (packet) => {
        return {
          url: AUTH_ENDPOINT.AUTH_CHECK,
          method: "GET",
        };
      },
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        let response = await httpMiddlewareBoundary(
          dispatch,
          queryFulfilled,
          {}
        );

        if (response) {
          dispatch(authInit_slc(response));
        }
      },
    }),
    signIn: builder.mutation({
      query: (packet) => ({
        url: AUTH_ENDPOINT.AUTHENTICATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const response = await httpMiddlewareBoundary(
          dispatch,
          queryFulfilled,
          args
        );

        if (response) {
          dispatch(authInit_slc(response));
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAuthCheckQuery, useSignInMutation } =
  authService;
