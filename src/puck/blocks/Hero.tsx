import Link from "next/link";

export type HeroProps = {
  eyebrow: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  tone: "cream" | "dark" | "primary";
  image?: string;
  imageAlt?: string;
};

const toneStyles: Record<HeroProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
  primary: "bg-primary text-pure-white",
};

export function Hero({
  eyebrow,
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  tone,
  image,
  imageAlt,
}: HeroProps) {
  return (
    <section
      className={`${toneStyles[tone]} px-6 py-20 md:py-28 border-b-4 border-dark`}
    >
      <div className="max-w-4xl mx-auto">
        {image ? (
          <div className="aspect-video relative overflow-hidden border-2 border-dark bg-cream mb-10 shadow-[6px_6px_0_0_#1a1a2e]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt || ""}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ) : null}
        {eyebrow ? (
          <p className="uppercase tracking-widest text-sm font-semibold opacity-70 mb-4">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-4xl md:text-6xl leading-tight font-bold mb-6">
          {heading}
        </h1>
        {subheading ? (
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-8">
            {subheading}
          </p>
        ) : null}
        {ctaLabel && ctaHref ? (
          <Link
            href={ctaHref}
            className="inline-block bg-secondary text-dark font-semibold px-8 py-4 border-2 border-dark shadow-[4px_4px_0_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a2e] transition-transform"
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
