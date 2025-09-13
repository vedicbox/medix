import { createApi } from "@reduxjs/toolkit/query/react";
import { callBaseMutation, callBaseQuery } from "service/utils/baseQuery";
import { DISEASE_API } from "service/utils/endpoints";
import { httpConfig } from "service/utils/httpConfig";

const DISEASE_API_REDUCER_KEY = "diseaseApi";

export const diseaseService = createApi({
    reducerPath: DISEASE_API_REDUCER_KEY,
    baseQuery: httpConfig(),
    tagTypes: ["Disease"],
    endpoints: (builder) => ({
        createDisease: callBaseMutation(builder, DISEASE_API.create, "Disease"),
        updateDisease: callBaseMutation(builder, DISEASE_API.update, "Disease"),
        getAllDiseases: callBaseQuery(builder, DISEASE_API.findAll, "Disease"),
        getDiseaseName: callBaseQuery(builder, DISEASE_API.findNames, "Disease"),
    }),
});

export const {
    useCreateDiseaseMutation,
    useUpdateDiseaseMutation,
    useGetAllDiseasesQuery,
    useGetDiseaseNameQuery,
} = diseaseService;