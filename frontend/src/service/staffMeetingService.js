
import { createApi } from "@reduxjs/toolkit/query/react";
import { STAFF_MEETING_ENDPOINT } from "./config/endpoints";
import {
    httpConfig,
    httpMiddlewareBoundary,
    onHttpSuccess,
} from "./config/httpConfig";

const STAFF_MEETING_API_PATH_KEY = "staff-meeting-api";
export const staffMeetingService = createApi({
    reducerPath: STAFF_MEETING_API_PATH_KEY,
    baseQuery: httpConfig(),
    tagTypes: ['StaffMeeting'], // 1. Define a tag type
    endpoints: (builder) => ({
        createStaff: builder.mutation({
            query: (packet) => ({
                url: STAFF_MEETING_ENDPOINT.CREATE,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ['staff_meeting_modified'], // 2. Invalidate Staff tag on success
        }),
        fetchTbStaffMeeting: builder.query({
            query: () => ({
                url: STAFF_MEETING_ENDPOINT.FETCH_TABLIST,
                method: "GET",
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            providesTags: ['staff_meeting_modified'],
        }),

    }),
});
export const {
  useFetchTbStaffMeetingQuery,
  useCreateStaffMeetingMutation
} = staffMeetingService;