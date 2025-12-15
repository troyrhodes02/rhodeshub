// Portfolio Color Palette
// Cool, professional SaaS aesthetic with neon ice blue accents

// Shared colors (same in both modes)
export const shared = {
  primary: {
    main: "#3B6EA5",
    light: "#5A8BC4",
    dark: "#2A5280",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#29A3A3",
    light: "#4DC4C4",
    dark: "#1E7A7A",
    contrastText: "#FFFFFF",
  },
  highlight: {
    main: "#00D4FF",
    light: "#66E5FF",
    dark: "#00A3C7",
  },
  error: {
    main: "#EF4444",
    light: "#F87171",
    dark: "#DC2626",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#3B6EA5",
    light: "#5A8BC4",
    dark: "#2A5280",
    contrastText: "#FFFFFF",
  },
} as const;

// Light mode palette
export const lightPalette = {
  mode: "light" as const,
  ...shared,
  background: {
    default: "#F8FAFC",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#0F172A",
    secondary: "#64748B",
    disabled: "#94A3B8",
  },
  divider: "#E2E8F0",
  action: {
    hover: "rgba(59, 110, 165, 0.08)",
    selected: "rgba(59, 110, 165, 0.12)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
  },
};

// Dark mode palette
export const darkPalette = {
  mode: "dark" as const,
  ...shared,
  background: {
    default: "#0F172A",
    paper: "#1E293B",
  },
  text: {
    primary: "#F8FAFC",
    secondary: "#94A3B8",
    disabled: "#64748B",
  },
  divider: "#334155",
  action: {
    hover: "rgba(0, 212, 255, 0.08)",
    selected: "rgba(0, 212, 255, 0.12)",
    disabled: "rgba(255, 255, 255, 0.26)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
  },
};

// Legacy export for backwards compatibility
export const palette = lightPalette;

// Semantic color tokens
export const colors = {
  brand: shared.primary.main,
  brandLight: shared.primary.light,
  brandDark: shared.primary.dark,
  teal: shared.secondary.main,
  neonIce: shared.highlight.main,
  bgLight: lightPalette.background.default,
  bgWhite: lightPalette.background.paper,
  bgDark: darkPalette.background.paper,
  bgDarkest: darkPalette.background.default,
  textPrimary: lightPalette.text.primary,
  textMuted: lightPalette.text.secondary,
  border: lightPalette.divider,
  error: shared.error.main,
  warning: shared.warning.main,
  success: shared.success.main,
} as const;
