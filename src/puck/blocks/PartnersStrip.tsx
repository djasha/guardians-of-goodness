export type Partner = {
  _id: string;
  name: string;
  website?: string;
  logo?: { url?: string; alt?: string };
};

export type PartnersStripProps = {
  heading: string;
  subtext: string;
  tone: "cream" | "dark";
  _partners?: Partner[];
};

const toneClasses: Record<PartnersStripProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
};

export function PartnersStrip({
  heading,
  subtext,
  tone,
  _partners,
}: PartnersStripProps) {
  const partners = Array.isArray(_partners) ? _partners : [];

  if (partners.length === 0 && !heading) {
    return <div aria-hidden="true" className="hidden" />;
  }

  return (
    <section className={`${toneClasses[tone]} px-6 py-14`}>
      <div className="max-w-6xl mx-auto">
        {heading ? (
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              {heading}
            </h2>
            {subtext ? (
              <p className="text-base opacity-80 max-w-2xl mx-auto">{subtext}</p>
            ) : null}
          </div>
        ) : null}
        {partners.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => {
              const inner = partner.logo?.url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={partner.logo.url}
                  alt={partner.logo.alt || partner.name}
                  className="h-14 md:h-16 w-auto max-w-[140px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="font-display text-lg font-semibold opacity-90">
                  {partner.name}
                </span>
              );
              return partner.website ? (
                <a
                  key={partner._id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={partner.name}
                  className="flex items-center"
                >
                  {inner}
                </a>
              ) : (
                <span key={partner._id} className="flex items-center">
                  {inner}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
