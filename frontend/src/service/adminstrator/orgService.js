import { createApi } from "@reduxjs/toolkit/query/react";
import { ORG_ENDPOINT } from "service/config/endpoints";
import {
    httpConfig,
    httpMiddlewareBoundary,
    onHttpSuccess,
} from "service/config/httpConfig";

const ORG_API_PATH_KEY = "orgspace-api";

export const orgService = createApi({
    reducerPath: ORG_API_PATH_KEY,
    baseQuery: httpConfig(),
    endpoints: (builder) => ({
        createOrg: builder.mutation({
            query: (packet) => ({
                url: ORG_ENDPOINT.CREATE,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["org_modified"],
        }),
        updateOrg: builder.mutation({
            query: (packet) => ({
                url: ORG_ENDPOINT.UPDATE,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["org_modified"],
        }),
        findAllOrg: builder.query({
            query: () => {
                return {
                    url: ORG_ENDPOINT.FIND_ALL,
                    method: "GET",
                };
            },
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            providesTags: ["org_modified"],
        }),
    }),
});

export const {
   useCreateOrgMutation,
   useUpdateOrgMutation,
   useFindAllOrgQuery
} = orgService;
