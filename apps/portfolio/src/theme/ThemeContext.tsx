"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme-mode";

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [systemPreference, setSystemPreference] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage and system preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setModeState(stored);
    }
    setSystemPreference(getSystemPreference());
    setMounted(true);
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const toggleMode = () => {
    const newMode = resolvedMode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  const resolvedMode = mode === "system" ? systemPreference : mode;

  const value = useMemo(
    () => ({ mode, resolvedMode, setMode, toggleMode }),
    [mode, resolvedMode]
  );

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeContextProvider");
  }
  return context;
}

