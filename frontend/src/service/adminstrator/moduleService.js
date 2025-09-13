import { createApi } from "@reduxjs/toolkit/query/react";
import { MODULE_ENDPOINT } from "service/utils/endpoints";
import {
    httpConfig,
    httpMiddlewareBoundary,
    onHttpSuccess,
} from "service/utils/httpConfig";

const MODULE_API_PATH_KEY = "module-api";

// Define a service using a base URL and expected endpoints
export const moduleService = createApi({
    reducerPath: MODULE_API_PATH_KEY,
    baseQuery: httpConfig(),
    endpoints: (builder) => ({
        createModule: builder.mutation({
            query: (packet) => ({
                url: MODULE_ENDPOINT.CREATE,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["module_modified"],
        }),
        updateModule: builder.mutation({
            query: (packet) => ({
                url: MODULE_ENDPOINT.UPDATE,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["module_modified"],
        }),
        findAllModule: builder.query({
            query: () => {
                return {
                    url: MODULE_ENDPOINT.FIND_ALL,
                    method: "GET",
                };
            },
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            providesTags: ["module_modified"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useCreateModuleMutation,
    useUpdateModuleMutation,
    useFindAllModuleQuery
} = moduleService;
