// Portfolio Color Palette
// Cool, professional SaaS aesthetic with neon ice blue accents

export const palette = {
  // Primary Brand Colors
  primary: {
    main: "#3B6EA5", // Primary SaaS Blue
    light: "#5A8BC4",
    dark: "#2A5280",
    contrastText: "#FFFFFF",
  },

  // Secondary/Teal Accent
  secondary: {
    main: "#29A3A3", // Teal Accent
    light: "#4DC4C4",
    dark: "#1E7A7A",
    contrastText: "#FFFFFF",
  },

  // Highlight/Neon Ice Blue (for glows, special accents, hover effects)
  highlight: {
    main: "#00D4FF", // Neon Ice Blue
    light: "#66E5FF",
    dark: "#00A3C7",
  },

  // Background & Surface Colors
  background: {
    default: "#F8FAFC", // Light BG
    paper: "#FFFFFF",
    dark: "#1E293B", // Slate Surface (dark cards)
    darker: "#0F172A", // Dark Navy (deepest dark)
  },

  // Text Colors
  text: {
    primary: "#0F172A", // Dark Navy - Primary text
    secondary: "#64748B", // Muted Gray - Secondary text
    disabled: "#94A3B8",
  },

  // UI Colors
  divider: "#E2E8F0", // Border Gray

  // Status Colors
  error: {
    main: "#EF4444", // Destructive Red
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

  // Action Colors
  action: {
    hover: "rgba(59, 110, 165, 0.08)",
    selected: "rgba(59, 110, 165, 0.12)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
  },
} as const;

// Semantic color tokens for easy access
export const colors = {
  // Brand
  brand: palette.primary.main,
  brandLight: palette.primary.light,
  brandDark: palette.primary.dark,

  // Accents
  teal: palette.secondary.main,
  neonIce: palette.highlight.main,

  // Backgrounds
  bgLight: palette.background.default,
  bgWhite: palette.background.paper,
  bgDark: palette.background.dark,
  bgDarkest: palette.background.darker,

  // Text
  textPrimary: palette.text.primary,
  textMuted: palette.text.secondary,

  // UI
  border: palette.divider,

  // Status
  error: palette.error.main,
  warning: palette.warning.main,
  success: palette.success.main,
} as const;
