import GlobalAppbar from "components/appbar/GlobalAppbar";
import { APP_BAR_ENUM } from "values/enum";

export const switchAppBar = (mode = APP_BAR_ENUM.GLOBAL) => {
  switch (mode) {
    case APP_BAR_ENUM.GLOBAL:
      return <GlobalAppbar />;
    default:
      return null;
  }
};
