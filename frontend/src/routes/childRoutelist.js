import { DASH_TAG } from "config/module/tags";
import { lazy } from "react";
import { parseModuleTag } from "utils/parse";
import Loadable from "./Loadable";
import { ADMINISTRATOR_ROUTE, DASHBOARD_ROUTE, PARAMS_ROUTE, PATIENT_ROUTE } from "./routeurl";

const FinancePage = Loadable(lazy(() => import("pages/dashboard/finance")));
const MasterRolePage = Loadable(lazy(() => import("pages/dashboard/master/roles")));
const MasterSpecializationPage = Loadable(lazy(() => import("pages/dashboard/master/specialization")));
const MasterDiseasePage = Loadable(lazy(() => import("pages/dashboard/master/disease")));
const OverViewPage = Loadable(lazy(() => import("pages/dashboard/overview")));
const InitiatePatientConsultation = Loadable(lazy(() => import("pages/dashboard/patients/align")));
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
const DiseaseAddPage = Loadable(lazy(() => import("pages/dashboard/master/disease/crudForm/create")));
const DiseaseUpdatePage =  Loadable(lazy(() => import("pages/dashboard/master/disease/crudForm/update")));

const ModuleCreatePage = Loadable(lazy(() => import("pages/administrator/modules/crudForm/create")));
const ModuleUpdatePage = Loadable(lazy(() => import("pages/administrator/modules/crudForm/update")));
const OrgPage = Loadable(lazy(() => import("pages/administrator/organization")));
const OwnerViewPage = Loadable(lazy(() => import("pages/administrator/overview")));
const OrgCreatePage = Loadable(lazy(() => import("pages/administrator/organization/create")));
const OrgModifyPage = Loadable(lazy(() => import("pages/administrator/organization/edit")));
const OrgPermission = Loadable(lazy(() => import("pages/administrator/organization/permission")));
const ManageStaffBoard = Loadable(lazy(() => import("pages/dashboard/staff/manage/board")));

export const dashboard_crl = [
  {
    uuid: parseModuleTag(DASH_TAG.DASHBOARD).uuid,
    path: DASHBOARD_ROUTE.INDEX,
    baseProps: {
      element: <OverViewPage />,
      title: "Dashboard"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.STAFF).uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE,
    baseProps: {
      element: <StaffManagePage />,
      title: "Staff Management"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.STAFF).uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.ENROLL,
    baseProps: {
      element: <AddStaff />,
      title: "Add Staff"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.STAFF).uuid,
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.EDIT,
    baseProps: {
      element: <EditStaff />,
      title: "Edit Staff"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.STAFF).uuid,
    path:
      DASHBOARD_ROUTE.STAFF.BOARD.PATH +
      "/" +
      PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <ManageStaffBoard />,
      title: "Staff Board"
    }
  },
  {
    uuid: parseModuleTag(DASH_TAG.ALIGN_PT).uuid,
    path: DASHBOARD_ROUTE.PATIENT.ALIGN + "/" + PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <InitiatePatientConsultation />,
      title: "Align Patient"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.ALIGN_PT).uuid,
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
    uuid: parseModuleTag(DASH_TAG.ROLE_MASTER).uuid,
    path: DASHBOARD_ROUTE.MASTER.ROLES + "/" + PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <MasterRolePage />,
      title: "Role Master"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.SPECIALIZATION_MASTER).uuid,
    path: DASHBOARD_ROUTE.MASTER.SPECIALIZATION + "/" + PARAMS_ROUTE.WILD_CARD,
    baseProps: {
      element: <MasterSpecializationPage />,
      title: "Specialization Master"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.DISEASE_MASTER).uuid,
    path: DASHBOARD_ROUTE.MASTER.DISEASE,
    baseProps: {
      element: <MasterDiseasePage />,
      title: "Disease Master"
    },
  },  
  {
    uuid: parseModuleTag(DASH_TAG.DISEASE_MASTER).uuid,
    path: DASHBOARD_ROUTE.MASTER.DISEASE + "/" + PARAMS_ROUTE.CREATE,
    baseProps: {
      element: <DiseaseAddPage />,
      title: "Add Disease"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.DISEASE_MASTER).uuid,
    path: DASHBOARD_ROUTE.MASTER.DISEASE + "/" + PARAMS_ROUTE.UPDATE,
    baseProps: {
      element: <DiseaseUpdatePage />,
      title: "Update Disease"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.CLINIC_MASTER).uuid,
    path: DASHBOARD_ROUTE.MASTER.CLINIC,
    baseProps: {
      element: <ClinicMasterPage />,
      title: "Clinic Master"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.CLINIC_MASTER).uuid,
    path: DASHBOARD_ROUTE.MASTER.CLINIC + "/" + PARAMS_ROUTE.CREATE,
    baseProps: {
      element: <ClinicAddPage />,
      title: "Add Clinic"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.CLINIC_MASTER).uuid,
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
    uuid: parseModuleTag(DASH_TAG.PATIENT).uuid,
    path: PATIENT_ROUTE.CONSULT,
    baseProps: {
      element: <ConsultInitPage />,
      title: "Consult"
    },
  },
  {
    uuid: parseModuleTag(DASH_TAG.PATIENT).uuid,
    path: PARAMS_ROUTE.UPDATE,
    index: true,
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
    path: PARAMS_ROUTE.INDEX,
    baseProps: {
      element: <OwnerViewPage />,
      title: "Overview"
    },
  },
  {
    path: ADMINISTRATOR_ROUTE.MODULES.PARAM,
    baseProps: {
      element: <ModulePage />,
      title: "Module"
    },
  },
  {
    path: ADMINISTRATOR_ROUTE.MODULES.PARAM + "/" + PARAMS_ROUTE.CREATE,
    baseProps: {
      element: <ModuleCreatePage />,
      title: "Module Create"
    },
  },
  {
    path: ADMINISTRATOR_ROUTE.MODULES.PARAM + "/" + PARAMS_ROUTE.EDIT,
    baseProps: {
      element: <ModuleUpdatePage />,
      title: "Module Edit"
    },
  },
  {
    path: ADMINISTRATOR_ROUTE.ORG.PARAM,
    baseProps: {
      element: <OrgPage />,
      title: "Org"
    },
  },
  {
    path: ADMINISTRATOR_ROUTE.ORG.PARAM + "/" + PARAMS_ROUTE.CREATE,
    baseProps: {
      element: <OrgCreatePage />,
      title: "Org"
    },
  },
  {
    path: ADMINISTRATOR_ROUTE.ORG.PARAM + "/" + PARAMS_ROUTE.EDIT,
    baseProps: {
      element: <OrgModifyPage />,
      title: "Org"
    },
  },
  {
    path: ADMINISTRATOR_ROUTE.ORG.PARAM + "/" + PARAMS_ROUTE.PERMISSION,
    baseProps: {
      element: <OrgPermission />,
      title: "Org"
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

