import { cn } from "@/lib/utils";

const variants = {
  available: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  adopted: "bg-gray-100 text-gray-500",
  default: "bg-primary/10 text-primary",
} as const;

type Variant = keyof typeof variants;

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold leading-none",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
