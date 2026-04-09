/**
 * Renders text with subtle cat whiskers under the "CAT" portion.
 * Used in page titles and nav links for the CATalogue.
 */
export function CatWhiskersText({
  className,
  whiskerClassName,
}: {
  className?: string;
  whiskerClassName?: string;
}) {
  return (
    <span className={className}>
      <span className="relative inline-block">
        CAT
        <svg
          className={`absolute -bottom-[0.15em] left-1/2 -translate-x-1/2 w-[1.3em] pointer-events-none ${whiskerClassName || "text-current opacity-30"}`}
          viewBox="0 0 120 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* Left whiskers */}
          <path d="M40 9 Q22 6, 4 4" />
          <path d="M40 12 Q22 12, 4 12" />
          <path d="M40 15 Q22 18, 4 20" />
          {/* Right whiskers */}
          <path d="M80 9 Q98 6, 116 4" />
          <path d="M80 12 Q98 12, 116 12" />
          <path d="M80 15 Q98 18, 116 20" />
          {/* Nose */}
          <circle cx="60" cy="12" r="2.5" fill="currentColor" />
        </svg>
      </span>
      alogue
    </span>
  );
}
