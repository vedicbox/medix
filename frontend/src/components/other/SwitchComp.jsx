import GlobalAppbar from "components/appbar/GlobalAppbar";
import { APP_BAR_ENUM } from "values/enum";

export const switchAppBar = (mode = APP_BAR_ENUM.GLOBAL, drawerStat) => {
  switch (mode) {
    case APP_BAR_ENUM.GLOBAL:
      return <GlobalAppbar drawerStat={drawerStat} />;
    default:
      return null;
  }
};
