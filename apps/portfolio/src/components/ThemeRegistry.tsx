"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// Material UI theme with custom fonts
const theme = createTheme({
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: {
      fontFamily: "var(--font-sora), sans-serif",
    },
    h2: {
      fontFamily: "var(--font-sora), sans-serif",
    },
    h3: {
      fontFamily: "var(--font-sora), sans-serif",
    },
    h4: {
      fontFamily: "var(--font-sora), sans-serif",
    },
    h5: {
      fontFamily: "var(--font-sora), sans-serif",
    },
    h6: {
      fontFamily: "var(--font-sora), sans-serif",
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
