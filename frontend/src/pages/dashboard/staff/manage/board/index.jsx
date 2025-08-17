import DisplayContent from "components/placeholder/DisplayContent";
import ScrollableTabsButtonAuto from 'components/tabs/ScrollableTabs';
import { useState } from "react";
import StaffMeeting from "./staff-meetings";
const navlist = [
  {
    label: "Meetings",
    icon: "material-symbols-light:search-activity",
  },
];

export default function ManageStaffBoard() {
  const [indexVal, setIndexVal] = useState(0);

  const handleChange = (obj, val) => {
    setIndexVal(val);
  };

  return (
    <>
      <ScrollableTabsButtonAuto
        navlist={navlist}
        indexVal={indexVal}
        handleChange={handleChange}
      />

      <DisplayContent valid1={indexVal == 0}>
        <StaffMeeting/>
      </DisplayContent>
    </>
  );
}
