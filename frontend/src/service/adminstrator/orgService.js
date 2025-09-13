import { createApi } from "@reduxjs/toolkit/query/react";
import { ORG_ENDPOINT } from "service/utils/endpoints";
import {
    httpConfig,
    httpMiddlewareBoundary,
    onHttpSuccess,
} from "service/utils/httpConfig";

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
        updateOrgDetails: builder.mutation({
            query: (packet) => ({
                url: ORG_ENDPOINT.UPDATE_ORG_DETAILS,
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
        updateAdminDetails: builder.mutation({
            query: (packet) => ({
                url: ORG_ENDPOINT.UPDATE_ADMIN_DETAILS,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["admin_modified"],
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
        getOrgDetails: builder.query({
            query: (packet) => ({
                url: ORG_ENDPOINT.EDIT_ORG,
                method: "GET",
                params: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            providesTags: ["org_modified"],
        }),
        getAdminDetails: builder.query({
            query: (packet) => ({
                url: ORG_ENDPOINT.EDIT_ADMIN,
                method: "GET",
                params: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            providesTags: ["admin_modified"],
        }),
    }),
});

export const {
    useCreateOrgMutation,
    useUpdateOrgDetailsMutation,
    useUpdateAdminDetailsMutation,
    useFindAllOrgQuery,
    useGetOrgDetailsQuery,
    useGetAdminDetailsQuery,
} = orgService;