export type StatsProps = {
  heading: string;
  items: Array<{ value: string; label: string }>;
  tone: "cream" | "dark" | "primary";
};

const toneClasses: Record<StatsProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
  primary: "bg-primary text-pure-white",
};

export function Stats({ heading, items, tone }: StatsProps) {
  const hasItems = Array.isArray(items) && items.length > 0;
  const colClass = items?.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <section className={`${toneClasses[tone]} px-6 py-16 border-y-4 border-dark`}>
      <div className="max-w-5xl mx-auto">
        {heading ? (
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
            {heading}
          </h2>
        ) : null}
        {hasItems ? (
          <div className={`grid grid-cols-2 ${colClass} gap-6`}>
            {items.map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold">
                  {item.value}
                </div>
                <div className="text-sm md:text-base opacity-80 mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
