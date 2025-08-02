import { lazy } from "react";
import { ID_MAPPING } from "service/config/permissionlist";
import Loadable from "./Loadable";
import { ADMINISTRATOR_ROUTE, DASHBOARD_ROUTE, PARAMS_ROUTE, PATIENT_ROUTE } from "./routeurl";

const FinancePage = Loadable(lazy(() => import("pages/dashboard/finance")));
const MasterRolePage = Loadable(lazy(() => import("pages/dashboard/master/roles")));
const OverViewPage = Loadable(lazy(() => import("pages/dashboard/overview")));
const InitiatePatientConsultation = Loadable(lazy(() => import("pages/dashboard/patients/align")));
const PatientsEnrollment = Loadable(lazy(() => import("pages/dashboard/patients/enroll")));
const AddStaff = Loadable(lazy(() => import("pages/dashboard/staff/enrollment/create")));
const EditStaff = Loadable(lazy(() => import("pages/dashboard/staff/enrollment/update")));
const StaffManagePage = Loadable(lazy(() => import("pages/dashboard/staff/manage")));
const PageNotFoundPage = Loadable(lazy(() => import("pages/other/PageNotFound")));
const ConsultInitPage = Loadable(lazy(() => import("pages/patientBoard/consult")));
const ModulePage = Loadable(lazy(() => import("pages/administrator/modules")));
const PatientProfileUpdate = Loadable(lazy(() => import("pages/patientBoard/profileUpdate")));
const ClinicMasterPage = Loadable(lazy(() => import("pages/dashboard/master/clinic")));
const ClinicAddPage = Loadable(lazy(() => import("pages/dashboard/master/clinic/add")));
const ClinicUpdatePage = Loadable(lazy(() => import("pages/dashboard/master/clinic/edit")));
const ModuleCreatePage = Loadable(lazy(() => import("pages/administrator/modules/create")));
const ModuleUpdatePage = Loadable(lazy(() => import("pages/administrator/modules/update")));


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
      element: <InitiatePatientConsultation />,
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
      title: "Role Master"
    },
  },
  {
    uuid: ID_MAPPING.master.uuid,
    path: DASHBOARD_ROUTE.MASTER.CLINIC,
    baseProps: {
      element: <ClinicMasterPage />,
      title: "Clinic Master"
    },
  },
  {
    uuid: ID_MAPPING.master.uuid,
    path: DASHBOARD_ROUTE.MASTER.CLINIC + "/" + PARAMS_ROUTE.CREATE,
    baseProps: {
      element: <ClinicAddPage />,
      title: "Add Clinic"
    },
  },
  {
    uuid: ID_MAPPING.master.uuid,
    path: DASHBOARD_ROUTE.MASTER.CLINIC + "/" + PARAMS_ROUTE.UPDATE,
    baseProps: {
      element: <ClinicUpdatePage />,
      title: "Update Clinic"
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
  {
    path: PARAMS_ROUTE.UPDATE,
    baseProps: {
      element: <PatientProfileUpdate />,
      title: "Update Patient"
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
    path: ADMINISTRATOR_ROUTE.MODULES,
    baseProps: {
      element: <ModulePage />,
      title: "Module"
    },
  },
  {
    path: ADMINISTRATOR_ROUTE.MODULES + "/" + PARAMS_ROUTE.CREATE,
    baseProps: {
      element: <ModuleCreatePage />,
      title: "Module"
    },
  },
    {
    path: ADMINISTRATOR_ROUTE.MODULES + "/" + PARAMS_ROUTE.EDIT,
    baseProps: {
      element: <ModuleUpdatePage />,
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

