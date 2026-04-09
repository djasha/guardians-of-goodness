/**
 * Renders "CATalogue" with subtle cat whiskers on the C and T letters.
 * C gets whiskers extending from its opening (like a cat face in profile).
 * T gets whiskers extending from its crossbar ends.
 * Subtle but intentional — you notice it, smile, and move on.
 */
export function CatWhiskersText({
  className,
  whiskerClassName,
}: {
  className?: string;
  whiskerClassName?: string;
}) {
  const wClass = whiskerClassName || "text-current opacity-50";

  return (
    <span className={className}>
      {/* C with whiskers from its opening */}
      <span className="relative inline-block">
        C
        <svg
          className={`absolute top-[0.1em] -right-[0.2em] w-[0.55em] h-[0.75em] pointer-events-none ${wClass}`}
          viewBox="0 0 20 28"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* Three whiskers angled outward from the C opening */}
          <path d="M1 8 Q10 4, 19 1" />
          <path d="M1 14 Q10 13, 19 13" />
          <path d="M1 20 Q10 24, 19 27" />
        </svg>
      </span>
      A
      {/* T with whiskers from crossbar ends */}
      <span className="relative inline-block">
        T
        <svg
          className={`absolute top-[0.18em] left-[-0.3em] w-[1.6em] h-[0.5em] pointer-events-none ${wClass}`}
          viewBox="0 0 60 18"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* Left whiskers from T crossbar */}
          <path d="M18 6 Q10 2, 1 0" />
          <path d="M18 12 Q10 14, 1 18" />
          {/* Right whiskers from T crossbar */}
          <path d="M42 6 Q50 2, 59 0" />
          <path d="M42 12 Q50 14, 59 18" />
        </svg>
      </span>
      alogue
    </span>
  );
}
