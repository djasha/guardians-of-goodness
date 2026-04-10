"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "mystical";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "default",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const saved = localStorage.getItem("gog-theme") as Theme | null;
    if (saved === "mystical" || saved === "default") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "mystical") {
      root.classList.add("theme-mystical");
    } else {
      root.classList.remove("theme-mystical");
    }
    localStorage.setItem("gog-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
