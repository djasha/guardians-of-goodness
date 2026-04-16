"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
  external?: boolean;
}

const variants = {
  primary: "bg-primary text-white neo-border-sm neo-shadow-sm",
  secondary: "bg-secondary text-dark neo-border-sm neo-shadow-teal",
  accent: "bg-accent text-white neo-border-sm neo-shadow-sm",
  outline: "bg-transparent text-dark neo-border-sm",
  ghost: "bg-white/15 text-white neo-border-sm border-white/20",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled = false,
  magnetic = true,
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    setTransform({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const style = {
    transform: `translate(${transform.x}px, ${transform.y}px) ${isHovered ? "translate(-2px, -2px)" : ""}`,
    boxShadow: isHovered ? "6px 6px 0 var(--color-dark)" : undefined,
    transition: "transform 0.2s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.2s ease",
  };

  const classes = cn(
    "inline-flex items-center gap-2 font-bold cursor-pointer select-none",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const inner = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classes}
      style={style}
    >
      {children}
    </div>
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      );
    }
    return <Link href={href}>{inner}</Link>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="appearance-none">
      {inner}
    </button>
  );
}
