"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "default" ? "mystical" : "default")}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border-2 border-dark bg-cream px-4 py-2 text-sm font-bold shadow-[3px_3px_0_var(--color-primary)] transition-transform hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === "default" ? "🌙 Mystical" : "☀️ Default"}
    </button>
  );
}
