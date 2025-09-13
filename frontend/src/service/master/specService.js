import { createApi } from "@reduxjs/toolkit/query/react";
import { callBaseMutation, callBaseQuery } from "service/utils/baseQuery";
import { SPECs_API } from "service/utils/endpoints";
import { httpConfig } from "service/utils/httpConfig";

const SPECS_API_REDUCER_KEY = "specsApi";

export const specService = createApi({
    reducerPath: SPECS_API_REDUCER_KEY,
    baseQuery: httpConfig(),
    tagTypes: ["Specs"],
    endpoints: (builder) => ({
        createSpecs: callBaseMutation(builder, SPECs_API.create, "Specs"),
        updateSpecs: callBaseMutation(builder, SPECs_API.update, "Specs"),
        getAllSpecs: callBaseQuery(builder, SPECs_API.findAll, "Specs"),
        getSpecsNames: callBaseQuery(builder, SPECs_API.findNames, "Specs"),
    }),
});

export const {
    useCreateSpecsMutation,
    useUpdateSpecsMutation,
    useGetAllSpecsQuery,
    useGetSpecsNamesQuery,
} = specService;
