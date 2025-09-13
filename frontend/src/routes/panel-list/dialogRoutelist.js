import { DASH_TAG } from "config/module/tags";
import { lazy } from "react";
import { parseModuleTag } from "utils/parse";
import Loadable from "../Loadable";
import { PARAMS_ROUTE } from "../routeurl";
import { ROUTE_PARAMS } from "../segment/routeSegment";

const AddMeetingPage = Loadable(lazy(() => import("pages/dashboard/staff/manage/board/staff-meetings/crud/AddMeeting")));
const UpdateSpecsPage = Loadable(lazy(() => import("pages/dashboard/master/disease/spec/crud/UpdateSpecs")));
const AddSpecsPage = Loadable(lazy(() => import("pages/dashboard/master/disease/spec/crud/AddSpecs")));

export const STAFF_DLROUTE = {
    staffMeeting: [
        {
            uuid: parseModuleTag(DASH_TAG.DASHBOARD).uuid,
            path: PARAMS_ROUTE.CREATE,
            baseProps: {
                element: <AddMeetingPage />,
                title: "Add Meeting"
            },
        },
    ]
}


export const MASTER_DLROUTE = {
    sepcs: [
        {
            uuid: parseModuleTag(DASH_TAG.MASTER).uuid,
            path: ROUTE_PARAMS.create,
            baseProps: {
                element: <AddSpecsPage />,
                title: "Add Specs"
            },
        },
        {
            uuid: parseModuleTag(DASH_TAG.MASTER).uuid,
            path: ROUTE_PARAMS.update,
            baseProps: {
                element: <UpdateSpecsPage />,
                title: "Add Specs"
            },
        },
    ]
}
