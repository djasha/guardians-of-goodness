"use client";

import { cn } from "@/lib/utils";

interface PawPrintProps {
  size?: number;
  color?: string;
  className?: string;
}

export function PawPrint({
  size = 24,
  color = "currentColor",
  className,
}: PawPrintProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      {/* Main pad */}
      <ellipse cx="32" cy="42" rx="12" ry="10" />
      {/* Top-left toe */}
      <ellipse cx="18" cy="24" rx="6" ry="8" transform="rotate(-15 18 24)" />
      {/* Top-right toe */}
      <ellipse cx="46" cy="24" rx="6" ry="8" transform="rotate(15 46 24)" />
      {/* Bottom-left toe */}
      <ellipse cx="14" cy="36" rx="5" ry="7" transform="rotate(-30 14 36)" />
      {/* Bottom-right toe */}
      <ellipse cx="50" cy="36" rx="5" ry="7" transform="rotate(30 50 36)" />
    </svg>
  );
}
