import { createApi } from "@reduxjs/toolkit/query/react";
import {
    httpConfig,
    httpMiddlewareBoundary,
    onHttpSuccess
} from "./config/httpConfig";
import { FILE_PUBLISH_ENDPOINT } from "./config/endpoints";

const FILE_PUBLISH_API_PATH_KEY = "file-publish-api";

export const filePublishService = createApi({
    reducerPath: FILE_PUBLISH_API_PATH_KEY,
    baseQuery: httpConfig(),
    endpoints: (builder) => ({
        generateConsultRecept: builder.mutation({
            query: (packet) => ({
                url: FILE_PUBLISH_ENDPOINT.GENERATE_CONSULT_RECEPT,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["initiateConsult"],
        }),
    }),
});

export const {
    useGenerateConsultReceptMutation
} = filePublishService;
