import { ACCESS_TAG, DASH_TAG } from "config/module/tags";
import { lazy } from "react";
import { parseModuleTag } from "utils/parse";
import Loadable from "../Loadable";
import { PATIENT_ROUTE } from "../routeurl";
import ROUTE_SEG, { ROUTE_PARAMS } from "../segment/routeSegment";


// Lazy-loaded components
const PatientQueue = Loadable(lazy(() => import("pages/dashboard/patients/queue")));
const FinancePage = Loadable(lazy(() => import("pages/dashboard/finance")));
const MasterRolePage = Loadable(lazy(() => import("pages/dashboard/master/roles")));
const OverViewPage = Loadable(lazy(() => import("pages/dashboard/overview")));
const AddToQueue = Loadable(lazy(() => import("pages/dashboard/addToQueue")));
const PatientsEnrollment = Loadable(lazy(() => import("pages/dashboard/patients/enroll")));
const AddStaff = Loadable(lazy(() => import("pages/dashboard/staff/enrollCrud/create")));
const EditStaff = Loadable(lazy(() => import("pages/dashboard/staff/enrollCrud/update")));
const StaffManagePage = Loadable(lazy(() => import("pages/dashboard/staff/manage")));
const PageNotFoundPage = Loadable(lazy(() => import("pages/other/PageNotFound")));
const ConsultInitPage = Loadable(lazy(() => import("pages/patientBoard/consult")));
const ModulePage = Loadable(lazy(() => import("pages/administrator/modules")));
const PatientProfileUpdate = Loadable(lazy(() => import("pages/patientBoard/profileUpdate")));
const ClinicMasterPage = Loadable(lazy(() => import("pages/dashboard/master/clinic")));
const ClinicAddPage = Loadable(lazy(() => import("pages/dashboard/master/clinic/crud/add")));
const ClinicUpdatePage = Loadable(lazy(() => import("pages/dashboard/master/clinic/crud/edit")));
const ModuleCreatePage = Loadable(lazy(() => import("pages/administrator/modules/crudForm/create")));
const ModuleUpdatePage = Loadable(lazy(() => import("pages/administrator/modules/crudForm/update")));
const OrgPage = Loadable(lazy(() => import("pages/administrator/organization")));
const OwnerViewPage = Loadable(lazy(() => import("pages/administrator/overview")));
const OrgCreatePage = Loadable(lazy(() => import("pages/administrator/organization/create")));
const OrgModifyPage = Loadable(lazy(() => import("pages/administrator/organization/edit")));
const OrgPermission = Loadable(lazy(() => import("pages/administrator/organization/permission")));
const ManageStaffBoard = Loadable(lazy(() => import("pages/dashboard/staff/manage/board")));
const ManageDisease = Loadable(lazy(() => import("pages/dashboard/master/disease")));

// Enhanced helper function to handle additional properties like 'index'
const createRoute = (path, element, title, uuid = ACCESS_TAG.PUBLIC, additionalProps = {}) => ({
  uuid,
  path,
  ...additionalProps,
  baseProps: { element, title }
});

// Route configurations
export const dashboard_crl = [
  createRoute(ROUTE_PARAMS.index, <OverViewPage />, "Dashboard"),
  createRoute(ROUTE_SEG.dashboard.addToQueue.route, <AddToQueue />, "Add-To-Queue", parseModuleTag(DASH_TAG.ALIGN_PT).uuid),


  // Staff routes
  createRoute(ROUTE_SEG.staff.manage, <StaffManagePage />, "Staff Management", parseModuleTag(DASH_TAG.STAFF).uuid),
  createRoute(ROUTE_SEG.staff.create, <AddStaff />, "Add Staff", parseModuleTag(DASH_TAG.STAFF).uuid),
  createRoute(ROUTE_SEG.staff.update, <EditStaff />, "Edit Staff", parseModuleTag(DASH_TAG.STAFF).uuid),
  createRoute(ROUTE_SEG.staff.board.route, <ManageStaffBoard />, "Staff Board", parseModuleTag(DASH_TAG.STAFF).uuid),

  // Patient routes
  createRoute(ROUTE_SEG.dashboard.queue.route, <PatientQueue />, "Queue", parseModuleTag(DASH_TAG.ALIGN_PT).uuid),
  createRoute(ROUTE_SEG.dashboard.create, <PatientsEnrollment />, "Patient-Create", parseModuleTag(DASH_TAG.ALIGN_PT).uuid),

  // Finance route
  createRoute("", <FinancePage />, "Finance"),

  // Master routes
  createRoute(ROUTE_SEG.master.roles, <MasterRolePage />, "Role Master", parseModuleTag(DASH_TAG.MASTER).uuid),
  createRoute(ROUTE_SEG.master.clinic.index, <ClinicMasterPage />, "Clinic Master", parseModuleTag(DASH_TAG.MASTER).uuid),
  createRoute(ROUTE_SEG.master.clinic.create, <ClinicAddPage />, "Create Clinic", parseModuleTag(DASH_TAG.MASTER).uuid),
  createRoute(ROUTE_SEG.master.clinic.update, <ClinicUpdatePage />, "Update Clinic", parseModuleTag(DASH_TAG.MASTER).uuid),
  createRoute(ROUTE_SEG.master.disease.route, <ManageDisease />, "Disease", parseModuleTag(DASH_TAG.MASTER).uuid),

  // Catch-all route
  createRoute(ROUTE_PARAMS.wildcard, <PageNotFoundPage />, "Page Not Found")
];

export const patientboard_crl = [
  createRoute(PATIENT_ROUTE.CONSULT, <ConsultInitPage />, "Consult", parseModuleTag(DASH_TAG.PATIENT).uuid),
  createRoute(ROUTE_PARAMS.update, <PatientProfileUpdate />, "Update Patient", parseModuleTag(DASH_TAG.PATIENT).uuid, { index: true })
];

export const administrator_crl = [
  createRoute(ROUTE_PARAMS.index, <OwnerViewPage />, "Overview"),

  // Module routes
  createRoute(ROUTE_SEG.module, <ModulePage />, "Module"),
  createRoute(ROUTE_SEG.module.create, <ModuleCreatePage />, "Module Create"),
  createRoute(ROUTE_SEG.module.update, <ModuleUpdatePage />, "Module Update"),

  // Organization routes
  createRoute(ROUTE_SEG.org, <OrgPage />, "Org"),
  createRoute(ROUTE_SEG.org.create, <OrgCreatePage />, "Org Create"),
  createRoute(ROUTE_SEG.org.update, <OrgModifyPage />, "Org Update"),
  createRoute(ROUTE_SEG.org.permission, <OrgPermission />, "Permission"),

  // Catch-all route
  createRoute(ROUTE_PARAMS.wildcard, <PageNotFoundPage />, "Page Not Found")
];

