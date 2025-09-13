import { createApi } from "@reduxjs/toolkit/query/react";
import { ROLE_ENDPOINT } from "service/utils/endpoints";
import {
  httpConfig,
  httpMiddlewareBoundary,
  onHttpSuccess,
} from "service/utils/httpConfig";

const ROLE_API_PATH_KEY = "role-api";

// Define a service using a base URL and expected endpoints
export const roleService = createApi({
  reducerPath: ROLE_API_PATH_KEY,
  baseQuery: httpConfig(),
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    // Get all roles
    getAllRoles: builder.query({
      query: () => ({
        url: ROLE_ENDPOINT.GET_ALL,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, {});
      },
      providesTags: ["role"],
    }),
    // Get role names only
    getRoleNames: builder.query({
      query: () => ({
        url: ROLE_ENDPOINT.GET_NAMES,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, {});
      },
      providesTags: ["role"],
    }),

    // Get admin list
    getAdminList: builder.query({
      query: () => ({
        url: ROLE_ENDPOINT.GET_ADMIN_LIST,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ["role"],
    }),

    // Create a new role
    createRole: builder.mutation({
      query: (packet) => ({
        url: ROLE_ENDPOINT.CREATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ["role"],
    }),

    // Update an existing role
    updateRole: builder.mutation({
      query: (packet) => ({
        url: ROLE_ENDPOINT.UPDATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ["role"],
    }),

    // Update role permissions
    updateRolePermissions: builder.mutation({
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
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllRolesQuery,
  useGetRoleNamesQuery,
  useGetAdminListQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useUpdateRolePermissionsMutation,
} = roleService;