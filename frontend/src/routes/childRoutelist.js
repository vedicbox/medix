import { lazy } from "react";
import Loadable from "./Loadable";
import { ID_MAPPING } from "service/config/permissionlist";
import { DASHBOARD_ROUTE, PARAMS_ROUTE, PATIENT_ROUTE } from "./routeurl";

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


export const dashboard_crl = [
  {
    uuid: ID_MAPPING.dashboard.uuid,
    path: DASHBOARD_ROUTE.INDEX,
    element: <OverViewPage />,
  },
  {
    uuid: ID_MAPPING.staff.uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE,
    element: <StaffManagePage />,
  },
  {
    uuid: ID_MAPPING.staff.uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.ENROLL,
    element: <AddStaff />,
  },
  {
    uuid: ID_MAPPING.staff.uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.EDIT,
    element: <EditStaff />,
  },
  {
    uuid: ID_MAPPING.patient.uuid,
    path: DASHBOARD_ROUTE.PATIENT.ALIGN + "/" + PARAMS_ROUTE.WILD_CARD,
    element: <AlignPatient />,
  },
  {
    uuid: ID_MAPPING.patient.uuid,
    path: DASHBOARD_ROUTE.PATIENT.ENROLL,
    element: <PatientsEnrollment />,
  },
  {
    path: DASHBOARD_ROUTE.FINANCE.BOARD,
    element: <FinancePage />,
  },
  {
    uuid: ID_MAPPING.master.uuid,
    path: DASHBOARD_ROUTE.MASTER.ROLES + "/" + PARAMS_ROUTE.WILD_CARD,
    element: <MasterRolePage />,
  },
  {
    path: PARAMS_ROUTE.WILD_CARD,
    element: <PageNotFoundPage />,
  },
];

export const patientboard_crl = [
  {
    path: PATIENT_ROUTE.CONSULT,
    element: <ConsultInitPage />,
  },
];
