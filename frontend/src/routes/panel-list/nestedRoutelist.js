import { DASH_TAG } from "config/module/tags"
import InitDisease from "pages/dashboard/master/disease/init"
import AddDiseasePage from "pages/dashboard/master/disease/init/crud/AddDisease"
import UpdateDiseasePage from "pages/dashboard/master/disease/init/crud/UpdateDisease"
import InitSpecialization from "pages/dashboard/master/disease/spec"
import { parseModuleTag } from "utils/parse"
import { MASTER_SEG, ROUTE_PARAMS } from "../segment/routeSegment"

export const masterNsRoute = {
    disease: [
        // {
        //     uuid: parseModuleTag(DASH_TAG.MASTER).uuid,
        //     path: MASTER_SEG.disease.init.route,
        //     baseProps: {
        //         element: <InitDisease />,
        //         title: "Manage Disease"
        //     },
        // },
        // {
        //     uuid: parseModuleTag(DASH_TAG.MASTER).uuid,
        //     path: ROUTE_PARAMS.create,
        //     baseProps: {
        //         element: <AddDiseasePage />,
        //         title: "Create Disease"
        //     },
        // },
        // {
        //     uuid: parseModuleTag(DASH_TAG.MASTER).uuid,
        //     path: ROUTE_PARAMS.update,
        //     baseProps: {
        //         element: <UpdateDiseasePage />,
        //         title: "Create Disease"
        //     },
        // },
        // {
        //     uuid: parseModuleTag(DASH_TAG.MASTER).uuid,
        //     path: MASTER_SEG.disease.spec.route,
        //     baseProps: {
        //         element: <InitSpecialization />,
        //         title: "Manage Spec"
        //     },
        // },
    ]
}
