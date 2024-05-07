"use client";
import React, { ReactNode } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import DARK_THEME from "./dark";
import LIGHT_THEME from "./light";

interface ThemeProviderProps {
  value: "light" | "dark";
  children: ReactNode;
}

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ({
  value,
  children,
}) => {
  const [mode, setMode] = React.useState<"light" | "dark">(value);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => createTheme(mode === "light" ? LIGHT_THEME : DARK_THEME),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;
