import { createApi } from "@reduxjs/toolkit/query/react";
import { STAFF_ENDPOINT } from "../config/endpoints";
import {
  httpConfig,
  httpMiddlewareBoundary,
  onHttpSuccess,
} from "../config/httpConfig";

const STAFF_API_PATH_KEY = "staff-api";

export const staffService = createApi({
  reducerPath: STAFF_API_PATH_KEY,
  baseQuery: httpConfig(),
  tagTypes: ['staff'],
  endpoints: (builder) => ({
    createStaffProfile: builder.mutation({
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
      invalidatesTags: ['staff'],
    }),

    getStaffById: builder.query({
      query: (params) => ({
        url: STAFF_ENDPOINT.EDIT,
        method: "GET",
        params
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: (result, error, id) => [{ type: 'staff', id }],
    }),

    updateStaffProfile: builder.mutation({
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
      invalidatesTags: (result, error, { staffId }) => [
        { type: 'staff', id: staffId },
        'staff',
      ],
    }),

    fetchAllStaff: builder.query({
      query: () => ({
        url: STAFF_ENDPOINT.PROFILES,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ['staff'],
    }),

    fetchStaffListByRole: builder.query({
      query: (params) => ({
        url: STAFF_ENDPOINT.BY_ROLE,
        method: "GET",
        params
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ['staff'],
    }),
  }),
});

export const {
  useCreateStaffProfileMutation,
  useGetStaffByIdQuery,
  useUpdateStaffProfileMutation,
  useFetchAllStaffQuery,
  useFetchStaffListByRoleQuery,
} = staffService;
