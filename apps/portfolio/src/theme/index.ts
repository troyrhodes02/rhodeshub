import { createTheme } from "@mui/material/styles";
import { palette, colors } from "./palette";

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

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: palette.primary,
    secondary: palette.secondary,
    highlight: palette.highlight,
    background: {
      default: palette.background.default,
      paper: palette.background.paper,
    },
    text: palette.text,
    divider: palette.divider,
    error: palette.error,
    warning: palette.warning,
    success: palette.success,
    info: palette.info,
    action: palette.action,
  },
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
        outlined: {
          borderColor: palette.divider,
          "&:hover": {
            borderColor: palette.primary.main,
            backgroundColor: "rgba(59, 110, 165, 0.04)",
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
          border: `1px solid ${palette.divider}`,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(59, 110, 165, 0.12)",
        },
        bar: {
          backgroundColor: palette.primary.main,
        },
      },
    },
  },
});

// Re-export palette and colors for direct access
export { palette, colors } from "./palette";
