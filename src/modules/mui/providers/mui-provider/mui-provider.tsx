"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme/theme";
import CssBaseline from "@mui/material/CssBaseline";

export function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
