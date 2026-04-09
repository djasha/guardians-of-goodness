import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-light hover:shadow-[0_0_20px_rgba(155,77,202,0.4)] active:bg-primary-dark",
  secondary:
    "bg-secondary text-white hover:bg-secondary-light hover:shadow-[0_0_20px_rgba(78,205,196,0.4)] active:bg-secondary-dark",
  ghost:
    "bg-transparent text-dark hover:bg-dark/5 active:bg-dark/10",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary-dark active:border-primary-dark",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 cursor-pointer select-none",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 pointer-events-none",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
