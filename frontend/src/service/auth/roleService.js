import { createApi } from "@reduxjs/toolkit/query/react";
import { ROLE_ENDPOINT } from "service/config/endpoints";
import {
  httpConfig,
  httpMiddlewareBoundary,
  onHttpSuccess,
} from "service/config/httpConfig";

const ROLE_API_PATH_KEY = "role-api";

// Define a service using a base URL and expected endpoints
export const roleService = createApi({
  reducerPath: ROLE_API_PATH_KEY,
  baseQuery: httpConfig(),
  endpoints: (builder) => ({
    fetchRoleNames: builder.query({
      query: (packet) => {
        return {
          url: ROLE_ENDPOINT.FETCH_ROLE_NAMES,
          method: "GET",
        };
      },
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, {});
      },
      providesTags: ["role_modified"],
    }),
    createRole: builder.mutation({
      query: (packet) => ({
        url: ROLE_ENDPOINT.CREATE_ROLE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ["role_modified"],
    }),
    updateRole: builder.mutation({
      query: (packet) => ({
        url: ROLE_ENDPOINT.UPDATE_ROLE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ["role_modified"],
    }),
    updatePermissions: builder.mutation({
      query: (packet) => ({
        url: ROLE_ENDPOINT.UPDATE_PERMISSIONS,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
    }),
    getTBRoles: builder.query({
      query: () => {
        return {
          url: ROLE_ENDPOINT.FETCH_TB_LIST,
          method: "GET",
        };
      },
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ["role_modified"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchRoleNamesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useUpdatePermissionsMutation,
  useGetTBRolesQuery
} = roleService;
