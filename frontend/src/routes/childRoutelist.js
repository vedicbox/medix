import { lazy } from "react";
import { ID_MAPPING } from "service/config/permissionlist";
import Loadable from "./Loadable";
import { ADMINISTRATOR_ROUTE, DASHBOARD_ROUTE, PARAMS_ROUTE, PATIENT_ROUTE } from "./routeurl";

const FinancePage = Loadable(lazy(() => import("pages/dashboard/finance")));
const MasterRolePage = Loadable(lazy(() => import("pages/dashboard/master/roles")));
const OverViewPage = Loadable(lazy(() => import("pages/dashboard/overview")));
const AlignPatient = Loadable(lazy(() => import("pages/dashboard/patients/align")));
const PatientsEnrollment = Loadable(lazy(() => import("pages/dashboard/patients/enroll")));
const AddStaff = Loadable(lazy(() => import("pages/dashboard/staff/enrollment/create")));
const EditStaff = Loadable(lazy(() => import("pages/dashboard/staff/enrollment/update")));
const StaffManagePage = Loadable(lazy(() => import("pages/dashboard/staff/manage")));
const PageNotFoundPage = Loadable(lazy(() => import("pages/other/PageNotFound")));
const ConsultInitPage = Loadable(lazy(() => import("pages/patientBoard/consult")));
const ModulePage = Loadable(lazy(() => import("pages/administrator/modules")));

export const dashboard_crl = [
  {
    uuid: ID_MAPPING.dashboard.uuid,
    path: DASHBOARD_ROUTE.INDEX,
    baseProps: {
      element: <OverViewPage />,
      title: "Dashboard"
    },
  },
  {
    uuid: ID_MAPPING.staff.uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE,
    baseProps: {
      element: <StaffManagePage />,
      title: "Staff Management"
    },
  },
  {
    uuid: ID_MAPPING.staff.uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.ENROLL,
    baseProps: {
      element: <AddStaff />,
      title: "Add Staff"
    },
  },
  {
    uuid: ID_MAPPING.staff.uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.EDIT,
    baseProps: {
      element: <EditStaff />,
      title: "Edit Staff"
    },
  },
  {
    uuid: ID_MAPPING.patient.uuid,
    path: DASHBOARD_ROUTE.PATIENT.ALIGN + "/" + PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <AlignPatient />,
      title: "Align Patient"
    },
  },
  {
    uuid: ID_MAPPING.patient.uuid,
    path: DASHBOARD_ROUTE.PATIENT.ENROLL,
    baseProps: {
      element: <PatientsEnrollment />,
      title: "Patients Enrollment"
    },
  },
  {
    path: DASHBOARD_ROUTE.FINANCE.BOARD,
    baseProps: {
      element: <FinancePage />,
      title: "Finance"
    },
  },
  {
    uuid: ID_MAPPING.master.uuid,
    path: DASHBOARD_ROUTE.MASTER.ROLES + "/" + PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <MasterRolePage />,
      title: "Master Role"
    },
  },
  {
    path: PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <PageNotFoundPage />,
      title: "Page Not Found"
    },
  },
];

export const patientboard_crl = [
  {
    path: PATIENT_ROUTE.CONSULT,
    baseProps: {
      element: <ConsultInitPage />,
      title: "Consult"
    },
  },
];


/**
 * Administrator Role Route List
 * 
 * Local:
 *   - Use `administrator_crl` for administrator-specific routes in development.
 * Production:
 *   - Use `administrator_crl` for administrator dashboard and management routes.
 */
export const administrator_crl = [
  {
    path: ADMINISTRATOR_ROUTE.MODULES + "/" + PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <ModulePage />,
      title: "Module"
    },
  },
  {
    path: PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <PageNotFoundPage />,
      title: "Page Not Found"
    },
  },
];
