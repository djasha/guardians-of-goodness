export type QuoteProps = {
  body: string;
  attribution: string;
  role: string;
  tone: "cream" | "dark" | "primary";
};

const toneClasses: Record<QuoteProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
  primary: "bg-primary text-pure-white",
};

export function Quote({ body, attribution, role, tone }: QuoteProps) {
  return (
    <section className={`${toneClasses[tone]} px-6 py-20 border-y-4 border-dark`}>
      <figure className="max-w-3xl mx-auto text-center">
        <blockquote className="font-display text-2xl md:text-4xl leading-snug font-semibold">
          <span aria-hidden="true" className="opacity-40 mr-1">
            &ldquo;
          </span>
          {body}
          <span aria-hidden="true" className="opacity-40 ml-1">
            &rdquo;
          </span>
        </blockquote>
        {attribution || role ? (
          <figcaption className="mt-6 text-sm md:text-base opacity-80">
            {attribution ? <span className="font-semibold">{attribution}</span> : null}
            {attribution && role ? <span className="mx-2 opacity-50">·</span> : null}
            {role ? <span>{role}</span> : null}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
