"use client";

import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiGlobalStyles from "@mui/material/GlobalStyles";

import EmotionCacheProvider from "./emotion-cache-provider";
import globalStyles from "../styles/global-styles";
import muiTheme from "../styles/mui-theme";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <EmotionCacheProvider>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <MuiGlobalStyles styles={globalStyles} />
        {children}
      </MuiThemeProvider>
    </EmotionCacheProvider>
  );
}
