import { cn } from "@/lib/utils";

interface PawPrintProps {
  className?: string;
}

/**
 * Shared decorative paw-print icon.
 *
 * This is the ONE exception to the "no custom SVGs" rule in CLAUDE.md —
 * lucide-react does not ship a paw print that matches the org's branding.
 * All paw decorations across the site import this component rather than
 * inlining the SVG.
 */
export function PawPrint({ className }: PawPrintProps) {
  return (
    <svg
      className={cn("w-6 h-6", className)}
      viewBox="0 0 40 44"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="20" cy="30" rx="10" ry="9" />
      <circle cx="8" cy="16" r="4.5" />
      <circle cx="17" cy="10" r="4" />
      <circle cx="27" cy="10" r="4" />
      <circle cx="35" cy="16" r="4.5" />
    </svg>
  );
}
