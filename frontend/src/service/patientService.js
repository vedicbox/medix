import { createApi } from "@reduxjs/toolkit/query/react";
import { patientInit_slc } from "store/root-reducer/patient";
import { PATIENT_ENDPOINT } from "./config/endpoints";
import {
    httpConfig,
    httpMiddlewareBoundary,
    onHttpSuccess,
} from "./config/httpConfig";

const PATIENT_API_PATH_KEY = "patient-api";

export const patientService = createApi({
    reducerPath: PATIENT_API_PATH_KEY,
    baseQuery: httpConfig(),
    endpoints: (builder) => ({
        validatePatient: builder.query({
            query: (params) => {
                return {
                    url: PATIENT_ENDPOINT.VALIDATE,
                    method: "GET",
                    params,
                };
            },
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                let response = await httpMiddlewareBoundary(
                    dispatch,
                    queryFulfilled,
                    {}
                );

                if (response) {
                    dispatch(patientInit_slc(response));
                }
            },
        }),
        searchPatient: builder.query({
            query: (searchParams) => {
                return {
                    url: PATIENT_ENDPOINT.SEARCH,
                    method: "GET",
                    params: searchParams,
                };
            },
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
        }),
        enrollPatient: builder.mutation({
            query: (packet) => ({
                url: PATIENT_ENDPOINT.ENROLL_PT,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
        }),
        alignPatient: builder.mutation({
            query: (packet) => ({
                url: PATIENT_ENDPOINT.ALIGN_PATIENT,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["alignPatient"],
        }),
        changeAlignPtStatus: builder.mutation({
            query: (packet) => ({
                url: PATIENT_ENDPOINT.CHANGE_ALIGN_STATUS,
                method: "POST",
                body: packet,
            }),
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            invalidatesTags: ["alignPatient"],
        }),
        fetchAlignPatient: builder.query({
            query: (searchParams) => {
                return {
                    url: PATIENT_ENDPOINT.ALIGN_PATIENT_LIST,
                    method: "GET",
                    params: searchParams,
                };
            },
            transformResponse: (result, { dispatch }) =>
                onHttpSuccess(result, dispatch),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                await httpMiddlewareBoundary(dispatch, queryFulfilled, args);
            },
            providesTags: ["alignPatient"],
        }),
    }),
});

export const {
    useEnrollPatientMutation,
    useLazySearchPatientQuery,
    useValidatePatientQuery,
    useAlignPatientMutation,
    useFetchAlignPatientQuery,
    useChangeAlignPtStatusMutation
} = patientService;
