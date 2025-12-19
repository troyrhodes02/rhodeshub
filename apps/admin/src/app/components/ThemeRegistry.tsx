"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeContextProvider, useThemeMode, getTheme } from "../theme";

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedMode } = useThemeMode();
  const theme = getTheme(resolvedMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </ThemeContextProvider>
  );
}
