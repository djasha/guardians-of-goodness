/**
 * Renders "CATalogue" with subtle cat whiskers on the C and T letters.
 * "CAT" stays as one text unit (no kerning breaks) with whiskers overlaid.
 * C whiskers: 3 lines fanning from its open side.
 * T whiskers: 2 lines from each end of the crossbar.
 */
export function CatWhiskersText({
  className,
  whiskerClassName,
}: {
  className?: string;
  whiskerClassName?: string;
}) {
  const wClass = whiskerClassName || "text-current opacity-45";

  return (
    <span className={className}>
      <span className="relative">
        CAT
        {/* C whiskers — 3 short lines from the gap of the C */}
        <svg
          className={`absolute top-[0.12em] left-[0.48em] w-[0.28em] h-[0.65em] pointer-events-none ${wClass}`}
          viewBox="0 0 10 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M1 7 Q5 4, 9 2" />
          <path d="M1 12 Q5 12, 9 12" />
          <path d="M1 17 Q5 20, 9 22" />
        </svg>
        {/* T whiskers — 2 lines from each crossbar tip */}
        <svg
          className={`absolute top-[0.08em] left-[1.6em] w-[0.95em] h-[0.35em] pointer-events-none ${wClass}`}
          viewBox="0 0 38 14"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* Left tip */}
          <path d="M12 4 Q7 2, 1 0" />
          <path d="M12 9 Q7 11, 1 14" />
          {/* Right tip */}
          <path d="M26 4 Q31 2, 37 0" />
          <path d="M26 9 Q31 11, 37 14" />
        </svg>
      </span>
      alogue
    </span>
  );
}
