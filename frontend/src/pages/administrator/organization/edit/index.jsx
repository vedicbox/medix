import { Grid } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import DisplayContent from "components/placeholder/DisplayContent";
import ScrollableTabs from "components/tabs/ScrollableTabs";
import CRUMB_NAV, { ADMINSTRATOR_CRUMB } from "list/crumb-list/crumbNav";
import { useState } from "react";
import AdminEditPage from "./adminEditPage";
import OrgEditPage from "./orgEditPage";

const stepperSteps = [
  {
    label: "Org Enroll",
  },
  {
    label: "Admin Form",
  },
];

export default function OrgModifyPage() {
  const [pageIndex, setPageIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setPageIndex(newValue);
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={CRUMB_NAV.module.update} />

      <ScrollableTabs
        navlist={stepperSteps}
        indexVal={pageIndex}
        handleChange={handleTabChange}
      />

      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, lg: 10 }}>
          <DisplayContent valid1={pageIndex === 0}>
            <OrgEditPage />
          </DisplayContent>
          <DisplayContent valid1={pageIndex === 1}>
            <AdminEditPage />
          </DisplayContent>
        </Grid>
      </Grid>
    </>
  );
}
