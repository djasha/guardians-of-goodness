export type RichTextProps = {
  heading: string;
  body: string;
  align: "left" | "center";
  tone: "cream" | "dark";
};

const toneClasses: Record<RichTextProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
};

export function RichText({ heading, body, align, tone }: RichTextProps) {
  const paragraphs = (body ?? "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <section className={`${toneClasses[tone]} px-6 py-16`}>
      <div
        className={`max-w-3xl mx-auto ${align === "center" ? "text-center" : ""}`}
      >
        {heading ? (
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            {heading}
          </h2>
        ) : null}
        {paragraphs.length > 0 ? (
          <div className="space-y-5 text-lg opacity-90">
            {paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
