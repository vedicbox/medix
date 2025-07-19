import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import PropTypes from "prop-types";

// assets

// project imports

import { useMemo } from "react";
import { palette } from "./palette";
import { typography } from "./typography";
import { shadows } from './shadows';
import { overrides } from './overrides';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export default function ThemeProvider({ basetheme, children }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(basetheme),
      typography,
      shadows: shadows(),
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);


  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
