import { createApi } from "@reduxjs/toolkit/query/react";
import { SPECS_ENDPOINT } from "config/endpoints";
import {
  httpConfig,
  httpMiddlewareBoundary,
  onHttpSuccess,
} from "config/httpConfig";

const SPECS_API_PATH_KEY = "specs-api";

// Define a service using a base URL and expected endpoints
export const specsService = createApi({
  reducerPath: SPECS_API_PATH_KEY,
  baseQuery: httpConfig(),
  tagTypes: ["Specs"],
  endpoints: (builder) => ({
    // Get all roles
    getAllSpecs: builder.query({
      query: () => ({
        url: SPECS_ENDPOINT.GET_ALL,
        method: "GET",
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await httpMiddlewareBoundary(dispatch, queryFulfilled, {});
      },
      providesTags: ["specs"],
    }),
    // Get specialization names only
    getSpecsNames: builder.query({
          query: () => ({
            url: SPECS_ENDPOINT.GET_NAMES,
            method: "GET",
          }),
          transformResponse: (result, { dispatch }) =>
            onHttpSuccess(result, dispatch),
          async onQueryStarted(args, { dispatch, queryFulfilled }) {
            await httpMiddlewareBoundary(dispatch, queryFulfilled, {});
          },
          providesTags: ["specs"],
        }),
    // Create a new specialization
    createSpecs: builder.mutation({
      query: (packet) => ({
        url: SPECS_ENDPOINT.CREATE,
        method: "POST",
        body: packet,
      }),
      transformResponse: (result, { dispatch }) =>
        onHttpSuccess(result, dispatch),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        httpMiddlewareBoundary(dispatch, queryFulfilled, args);
      },
      invalidatesTags: ["specs"],
    }),
     // Update an existing specialization
        updateSpecs: builder.mutation({
          query: (packet) => ({
            url: SPECS_ENDPOINT.UPDATE,
            method: "POST",
            body: packet,
          }),
          transformResponse: (result, { dispatch }) =>
            onHttpSuccess(result, dispatch),
          async onQueryStarted(args, { dispatch, queryFulfilled }) {
            httpMiddlewareBoundary(dispatch, queryFulfilled, args);
          },
          invalidatesTags: ["specs"],
        }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllSpecsQuery,
  useGetSpecsNamesQuery,
  useCreateSpecsMutation,
  useUpdateSpecsMutation,
} = specsService;