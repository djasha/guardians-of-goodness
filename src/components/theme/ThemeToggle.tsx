"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  /** Override classes for positioning / size in different nav contexts */
  className?: string;
  /** Icon size variant: sm (nav) or md (mobile panel) */
  size?: "sm" | "md";
  /** Override icon color (defaults to currentColor so parent context wins) */
  iconClassName?: string;
}

/**
 * Compact icon-only theme toggle. Designed to be dropped into either the
 * desktop header or the mobile side-panel top bar. Labels are "Light"/"Dark"
 * to the user even though the internal class name is still `theme-mystical`.
 */
export function ThemeToggle({ className, size = "sm", iconClassName }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "mystical";
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "default" : "mystical")}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-full neo-border-sm transition-all",
        "bg-white text-dark hover:bg-primary hover:text-white hover:-translate-y-0.5",
        size === "sm" ? "w-9 h-9" : "w-11 h-11",
        className
      )}
    >
      <Icon
        className={cn(size === "sm" ? "w-4 h-4" : "w-5 h-5", iconClassName)}
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </button>
  );
}
