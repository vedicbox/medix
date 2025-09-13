import { httpMiddlewareBoundary, onHttpSuccess } from "./httpConfig";


export const callBaseMutation = (builder, endpoint, tag) =>
    builder.mutation({
        query: (packet) => ({
            url: endpoint,
            method: "POST",
            body: packet,
        }),
        transformResponse: (result, { dispatch }) => onHttpSuccess(result, dispatch),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
            await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
        },
        invalidatesTags: [tag],
    });

export const callBaseQuery = (builder, endpoint, tag) =>
    builder.query({
        query: (params) => ({
            url: endpoint,
            method: "GET",
            params
        }),
        transformResponse: (result, { dispatch }) => onHttpSuccess(result, dispatch),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
            await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
        },
        providesTags: [tag],
    });
