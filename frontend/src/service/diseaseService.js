import { createApi } from "@reduxjs/toolkit/query/react";
import { DISEASE_ENDPOINT } from "config/endpoints";
import {
    httpConfig,
    httpMiddlewareBoundary,
    onHttpSuccess,
} from "config/httpConfig";

const DISEASE_API_PATH_KEY = "disease-api";

// Define a service using a base URL and expected endpoints
export const diseaseService = createApi({
    reducerPath: DISEASE_API_PATH_KEY,
    baseQuery: httpConfig(),
    endpoints: (builder) => ({
        createDisease: builder.mutation({
            query: (packet) => ({
                url: DISEASE_ENDPOINT.CREATE,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["disease_modified"],
        }),
        updateDisease: builder.mutation({
            query: (packet) => ({
                url: DISEASE_ENDPOINT.UPDATE,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["disease_modified"],
        }),
        findAllDisease: builder.query({
            query: () => {
                return {
                    url: DISEASE_ENDPOINT.FIND_ALL,
                    method: "GET",
                };
            },
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            providesTags: ["disease_modified"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useCreateDiseaseMutation,
    useUpdateDiseaseMutation,
    useFindAllDiseaseQuery
} = diseaseService;
