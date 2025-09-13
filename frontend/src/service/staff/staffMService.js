import { createApi } from "@reduxjs/toolkit/query/react";
import { STAFF_MEETING_ENDPOINTS } from "service/utils/endpoints";
import {
    httpConfig,
    httpMiddlewareBoundary,
    onHttpSuccess,
} from "service/utils/httpConfig";

const STAFF_MEETING_API_REDUCER_KEY = "staffMeetingApi";

export const staffMService = createApi({
    reducerPath: STAFF_MEETING_API_REDUCER_KEY,
    baseQuery: httpConfig(),
    tagTypes: ["StaffMeeting"],
    endpoints: (builder) => ({
        createStaffMeeting: builder.mutation({
            query: (payload) => ({
                url: STAFF_MEETING_ENDPOINTS.CREATE,
                method: "POST",
                body: payload,
            }),
            transformResponse: (response, meta) => onHttpSuccess(response, meta.dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["StaffMeetingModified"],
        }),
        fetchAllStaffMeetings: builder.query({
            query: (params) => ({
                url: STAFF_MEETING_ENDPOINTS.FIND_ALL,
                method: "GET",
                params
            }),
            transformResponse: (response, meta) => onHttpSuccess(response, meta.dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            providesTags: ["StaffMeetingModified"],
        }),
    }),
});

export const {
    useCreateStaffMeetingMutation,
    useFetchAllStaffMeetingsQuery,
} = staffMService;