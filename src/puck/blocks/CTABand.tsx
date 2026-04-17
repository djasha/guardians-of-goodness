import Link from "next/link";

export type CTABandProps = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTABand({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABandProps) {
  return (
    <section className="bg-primary text-pure-white px-6 py-20 border-y-4 border-dark">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
          {heading}
        </h2>
        {body ? <p className="text-lg md:text-xl opacity-90 mb-8">{body}</p> : null}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryLabel && primaryHref ? (
            <Link
              href={primaryHref}
              className="inline-block bg-secondary text-dark font-semibold px-8 py-4 border-2 border-dark shadow-[4px_4px_0_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a2e] transition-transform"
            >
              {primaryLabel}
            </Link>
          ) : null}
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="inline-block bg-cream text-dark font-semibold px-8 py-4 border-2 border-dark shadow-[4px_4px_0_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a2e] transition-transform"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
