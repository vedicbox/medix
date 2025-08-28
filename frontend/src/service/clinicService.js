import { createApi } from "@reduxjs/toolkit/query/react";
import { CLINIC_ENDPOINT } from "../config/endpoints";
import {
  httpConfig,
  httpMiddlewareBoundary,
  onHttpSuccess,
} from "../config/httpConfig";

const CLINIC_API_PATH_KEY = "clinic-api";

export const clinicService = createApi({
  reducerPath: CLINIC_API_PATH_KEY,
  baseQuery: httpConfig(),
  tagTypes: ['Clinic'],

  endpoints: (builder) => ({
    createClinic: builder.mutation({
      query: (packet) => ({
        url: CLINIC_ENDPOINT.CREATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) => onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ['Clinic'],
    }),
    fetchAllClinics: builder.query({
      query: () => ({
        url: CLINIC_ENDPOINT.FIND_ALL,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) => onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ['Clinic'],
    }),
    editClinic: builder.query({
      query: (params) => ({
        url: CLINIC_ENDPOINT.EDIT,
        method: "GET",
        params
      }),
      transformResponse: (result, { dispatch }) => onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ['Clinic'],
    }),
    updateClinic: builder.mutation({
      query: (packet) => ({
        url: CLINIC_ENDPOINT.UPDATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) => onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ['Clinic'],
    }),
    getClinicNames: builder.query({
      query: () => ({
        url: CLINIC_ENDPOINT.FETCH_CLINIC_LIST,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) => onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      providesTags: ['Clinic'],
    }),

  }),
});

export const {
  useCreateClinicMutation,
  useFetchAllClinicsQuery,
  useEditClinicQuery,
  useUpdateClinicMutation,
  useGetClinicNamesQuery
} = clinicService;