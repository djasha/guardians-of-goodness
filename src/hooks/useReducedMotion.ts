"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reads the user's `prefers-reduced-motion` preference and stays in sync with
 * OS-level changes. Uses `useSyncExternalStore` (not `useState`+`useEffect`)
 * to avoid the React 19 "setState in effect" lint and cascading renders.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false // server snapshot — assume motion allowed
  );
}
