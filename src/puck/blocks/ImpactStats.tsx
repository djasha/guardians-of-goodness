import { Heart, Users, Home, Sparkles, Shield, PawPrint } from "lucide-react";

const iconMap = {
  Heart,
  Users,
  Home,
  Sparkles,
  Shield,
  PawPrint,
} as const;

export type ImpactStatsProps = {
  heading: string;
  subtext: string;
  items: Array<{
    value: string;
    label: string;
    description: string;
    icon: keyof typeof iconMap;
  }>;
  tone: "cream" | "dark" | "primary";
};

const toneClasses: Record<ImpactStatsProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
  primary: "bg-primary text-pure-white",
};

export function ImpactStats({
  heading,
  subtext,
  items,
  tone,
}: ImpactStatsProps) {
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <section className={`${toneClasses[tone]} px-6 py-20 border-y-4 border-dark`}>
      <div className="max-w-6xl mx-auto">
        {heading || subtext ? (
          <div className="text-center max-w-2xl mx-auto mb-12">
            {heading ? (
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                {heading}
              </h2>
            ) : null}
            {subtext ? <p className="text-lg opacity-90">{subtext}</p> : null}
          </div>
        ) : null}
        {hasItems ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Heart;
              return (
                <div
                  key={i}
                  className="border-2 border-dark bg-white text-dark p-6 shadow-[6px_6px_0_0_#1a1a2e]"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                  <div className="font-display text-4xl md:text-5xl font-bold mb-1">
                    {item.value}
                  </div>
                  <div className="font-display text-lg font-semibold mb-2">
                    {item.label}
                  </div>
                  {item.description ? (
                    <p className="text-sm opacity-80">{item.description}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
