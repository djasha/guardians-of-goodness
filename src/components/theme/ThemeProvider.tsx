"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type Theme = "default" | "mystical";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "mystical",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Hydration strategy — the `<html>` element's class list is the single
 * source of truth for the theme:
 *
 *   1. A blocking inline script in `layout.tsx` reads `localStorage` and
 *      applies `theme-mystical` to `<html>` BEFORE React hydrates, so the
 *      first paint has correct CSS.
 *   2. `useSyncExternalStore` reads the class on the server (returns
 *      `"default"` — we can't know the user's pref at SSR time) and on
 *      the client (returns the real class value). React handles the
 *      server→client snapshot transition for us without a mismatch.
 *   3. `setTheme` writes to both the class and `localStorage`; the
 *      MutationObserver fires, which triggers `useSyncExternalStore`
 *      to re-render with the new value.
 */

function subscribeToThemeClass(onChange: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getClientThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("theme-mystical")
    ? "mystical"
    : "default";
}

function getServerThemeSnapshot(): Theme {
  return "mystical";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToThemeClass,
    getClientThemeSnapshot,
    getServerThemeSnapshot
  );

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    if (next === "mystical") {
      root.classList.add("theme-mystical");
    } else {
      root.classList.remove("theme-mystical");
    }
    try {
      localStorage.setItem("gog-theme", next);
    } catch {
      // localStorage can fail in privacy mode / sandboxed iframes. Ignore —
      // the class change still takes effect for the current session.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
