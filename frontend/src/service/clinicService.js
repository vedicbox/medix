import { createApi } from "@reduxjs/toolkit/query/react";
import { CLINIC_ENDPOINT } from "./config/endpoints";
import {
  httpConfig,
  httpMiddlewareBoundary,
  onHttpSuccess,
} from "./config/httpConfig";

const CLINIC_API_PATH_KEY = "clinic-api";

export const clinicService = createApi({
  reducerPath: CLINIC_API_PATH_KEY,
  baseQuery: httpConfig(),
  tagTypes: ['Clinic'], // 1. Define a tag type
  endpoints: (builder) => ({
    createClinic: builder.mutation({
      query: (packet) => ({
        url: CLINIC_ENDPOINT.CREATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ['clinic_modified'], // 2. Invalidate Staff tag on success
    }),
    editClinic: builder.query({
      query: (packet) => ({
        url: CLINIC_ENDPOINT.EDIT,
        method: "GET",
        params: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
        invalidatesTags: ['clinic_modified'],
    }),
    updateClinic: builder.mutation({
      query: (packet) => ({
        url: CLINIC_ENDPOINT.UPDATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ['clinic_modified'],
    }),
    fetchTbClinic: builder.query({
      query: () => ({
        url: CLINIC_ENDPOINT.FETCH_TABLIST,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ['clinic_modified'],
    }),
    
  }),
});

export const {
  useCreateClinicMutation,
  useEditClinicQuery,
  useUpdateClinicMutation,
  useFetchTbClinicQuery,
} = clinicService;
