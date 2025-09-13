import { ROUTE_PARAMS } from "routes/segment/routeSegment";
import { ICON_NAME } from "values/img-links";

const create = [
    {
        label: "Create",
        icon: ICON_NAME.ADD_NEW,
        link: {
            pathname: ROUTE_PARAMS.create,
        },
    },
]

const addToQueue = [
    {
        label: "Consult",
        icon: ICON_NAME.CONSULT,
        link: {
            pathname: ROUTE_PARAMS.search
        },
    },
]

export const crumbChild = {
    create,
    addToQueue
}