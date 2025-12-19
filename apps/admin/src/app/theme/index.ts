import { createTheme, ThemeOptions } from "@mui/material/styles";
import { lightPalette, darkPalette, shared } from "./palette";

// Extend MUI theme to include custom highlight color
declare module "@mui/material/styles" {
  interface Palette {
    highlight: {
      main: string;
      light: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    highlight?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

// Shared theme options (typography, shape, components)
const baseThemeOptions: Omit<ThemeOptions, "palette"> = {
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: { fontFamily: "var(--font-sora), sans-serif" },
    h2: { fontFamily: "var(--font-sora), sans-serif" },
    h3: { fontFamily: "var(--font-sora), sans-serif" },
    h4: { fontFamily: "var(--font-sora), sans-serif" },
    h5: { fontFamily: "var(--font-sora), sans-serif" },
    h6: { fontFamily: "var(--font-sora), sans-serif" },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(59, 110, 165, 0.3)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(59, 110, 165, 0.12)",
        },
        bar: {
          backgroundColor: shared.primary.main,
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "light",
    primary: lightPalette.primary,
    secondary: lightPalette.secondary,
    highlight: lightPalette.highlight,
    background: lightPalette.background,
    text: lightPalette.text,
    divider: lightPalette.divider,
    error: lightPalette.error,
    warning: lightPalette.warning,
    success: lightPalette.success,
    info: lightPalette.info,
    action: lightPalette.action,
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "dark",
    primary: darkPalette.primary,
    secondary: darkPalette.secondary,
    highlight: darkPalette.highlight,
    background: darkPalette.background,
    text: darkPalette.text,
    divider: darkPalette.divider,
    error: darkPalette.error,
    warning: darkPalette.warning,
    success: darkPalette.success,
    info: darkPalette.info,
    action: darkPalette.action,
  },
});

// Helper to get theme by mode
export function getTheme(mode: "light" | "dark") {
  return mode === "dark" ? darkTheme : lightTheme;
}

// Legacy export for backwards compatibility
export const theme = lightTheme;

// Re-export palette and colors for direct access
export { lightPalette, darkPalette, shared, colors } from "./palette";
export { ThemeContextProvider, useThemeMode } from "./ThemeContext";
