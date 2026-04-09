import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
