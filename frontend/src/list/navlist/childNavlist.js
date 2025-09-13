import { DASH_TAG } from "config/module/tags";
import ROUTE_SEG, { ROUTE_PARAMS } from "routes/segment/routeSegment";
import { parseModuleTag } from "utils/parse";
import { formatMsg } from "utils/security/validation";
import { ICON_NAME } from "values/img-links";

// Helper functions
const createNavItem = (title, uuid, icon, segment, children = null) => ({
  title,
  ...(uuid && { uuid }),
  icon,
  ...(segment && { segment }),
  ...(children && { children })
});


const createSegment = (pathname) => ({ pathname });

const getUuid = (tag) => parseModuleTag(tag).uuid;

// Navigation configurations
export const dashboard_navigation = () => [
  createNavItem("Dashboard", getUuid(DASH_TAG.DASHBOARD), ICON_NAME.DASHBOARD,
    createSegment(ROUTE_PARAMS.index)
  ),
  createNavItem("Add-To-Queue", getUuid(DASH_TAG.ALIGN_PT), ICON_NAME.WAITLIST,
    createSegment(ROUTE_SEG.dashboard.addToQueue.nav)
  ),
  createNavItem("Patient", getUuid(DASH_TAG.PATIENT), ICON_NAME.PATIENT, null, [
    createNavItem("Queue", getUuid(DASH_TAG.ALIGN_PT), ICON_NAME.WAITLIST,
      createSegment(ROUTE_SEG.dashboard.queue.nav)
    )
  ]),
  createNavItem("Staff", getUuid(DASH_TAG.STAFF), ICON_NAME.TEAMS, null, [
    createNavItem("Manage Staff", getUuid(DASH_TAG.STAFF_MANAGE), ICON_NAME.MANAGEMENT,
      createSegment(ROUTE_SEG.staff.manage)
    )
  ]),
  createNavItem("Master", getUuid(DASH_TAG.MASTER), ICON_NAME.MASTER, null, [
    createNavItem("Role Master", getUuid(DASH_TAG.MASTER), ICON_NAME.ROLE,
      createSegment(ROUTE_SEG.master.roles)
    ),
    createNavItem("Clinic Master", getUuid(DASH_TAG.MASTER), ICON_NAME.CLINIC,
      createSegment(ROUTE_SEG.master.clinic.index)
    ),
    createNavItem("Disease/Spec", getUuid(DASH_TAG.MASTER), ICON_NAME.DISEASE,
      createSegment(ROUTE_SEG.master.disease.nav)
    )
  ])
];

export const patientboard_nav = (patientId) => [
  createNavItem("Update Patient", getUuid(DASH_TAG.ALIGN_PT), ICON_NAME.UPDATE,
    // createSegment(getReplacerUri(ROUTE_SEG.patient.update, patientId))
  )
];

export const administrator_nav = () => [
  createNavItem("Overview", null, ICON_NAME.DASHBOARD,
    createSegment(ROUTE_SEG.admin.overview)
  ),
  createNavItem("Organization", null, ICON_NAME.ORG,
    createSegment(ROUTE_SEG.org.index)
  ),
  createNavItem("Module", null, ICON_NAME.NAV_MODULE,
    createSegment(ROUTE_SEG.module.index)
  )
];