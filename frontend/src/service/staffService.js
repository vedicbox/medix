import { createApi } from "@reduxjs/toolkit/query/react";
import { STAFF_ENDPOINT } from "./config/endpoints";
import {
  httpConfig,
  httpMiddlewareBoundary,
  onHttpSuccess,
} from "./config/httpConfig";

const STAFF_API_PATH_KEY = "staff-api";

export const staffService = createApi({
  reducerPath: STAFF_API_PATH_KEY,
  baseQuery: httpConfig(),
  tagTypes: ['Staff'], // 1. Define a tag type
  endpoints: (builder) => ({
    createStaff: builder.mutation({
      query: (packet) => ({
        url: STAFF_ENDPOINT.CREATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ['staff_modified'], // 2. Invalidate Staff tag on success
    }),
    editStaff: builder.query({
      query: (packet) => ({
        url: STAFF_ENDPOINT.EDIT,
        method: "GET",
        params: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ['staff_modified'],
    }),
    updateStaff: builder.mutation({
      query: (packet) => ({
        url: STAFF_ENDPOINT.UPDATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ['staff_modified'],
    }),
    fetchTbStaff: builder.query({
      query: () => ({
        url: STAFF_ENDPOINT.FETCH_TABLIST,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ['staff_modified'],
    }),
    stafflistViaRole: builder.query({
      query: (params) => ({
        url: STAFF_ENDPOINT.STAFF_LIST_VIA_ROLE,
        method: "GET",
        params,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
    }),
  }),
});

export const {
  useFetchTbStaffQuery,
  useCreateStaffMutation,
  useEditStaffQuery,
  useUpdateStaffMutation,
  useStafflistViaRoleQuery
} = staffService;
