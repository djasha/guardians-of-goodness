import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-block uppercase tracking-widest text-sm text-secondary font-semibold",
        className,
      )}
    >
      &mdash; {children}
    </span>
  );
}
