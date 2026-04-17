export type PageHeroProps = {
  badge: string;
  heading: string;
  subtext: string;
  image: string;
  imageAlt: string;
  bgTone: "dark" | "primary" | "secondary" | "cream";
  overlay: boolean;
  align: "left" | "center";
};

const toneClasses: Record<PageHeroProps["bgTone"], string> = {
  dark: "bg-dark text-cream",
  primary: "bg-primary text-pure-white",
  secondary: "bg-secondary text-dark",
  cream: "bg-cream text-dark",
};

export function PageHero({
  badge,
  heading,
  subtext,
  image,
  imageAlt,
  bgTone,
  overlay,
  align,
}: PageHeroProps) {
  const isDarkText = bgTone === "dark" || bgTone === "primary";
  const containerAlign = align === "center" ? "text-center items-center mx-auto" : "";

  return (
    <section
      className={`relative ${toneClasses[bgTone]} px-6 py-24 md:py-32 border-b-4 border-dark overflow-hidden`}
    >
      {image ? (
        <div className="absolute inset-0 -z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt || ""}
            className="w-full h-full object-cover"
          />
          {overlay ? (
            <div className="absolute inset-0 bg-dark/60" />
          ) : null}
        </div>
      ) : null}
      <div className={`relative z-10 max-w-4xl mx-auto ${containerAlign}`}>
        {badge ? (
          <p
            className={`uppercase tracking-widest text-xs font-bold mb-4 ${
              isDarkText ? "opacity-80" : "opacity-70"
            }`}
          >
            {badge}
          </p>
        ) : null}
        <h1
          className={`font-display font-bold mb-6 text-4xl md:text-6xl leading-tight ${
            align === "center" ? "max-w-3xl mx-auto" : ""
          }`}
        >
          {heading}
        </h1>
        {subtext ? (
          <p
            className={`text-lg md:text-xl max-w-2xl ${
              align === "center" ? "mx-auto" : ""
            } ${isDarkText ? "opacity-90" : "opacity-80"}`}
          >
            {subtext}
          </p>
        ) : null}
      </div>
    </section>
  );
}
