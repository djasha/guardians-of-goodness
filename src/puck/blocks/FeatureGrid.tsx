import { Heart, PawPrint, Home, Sparkles, Shield, Users } from "lucide-react";

const iconMap = {
  Heart,
  PawPrint,
  Home,
  Sparkles,
  Shield,
  Users,
} as const;

export type FeatureGridProps = {
  heading: string;
  items: Array<{
    title: string;
    body: string;
    icon: keyof typeof iconMap;
  }>;
};

export function FeatureGrid({ heading, items }: FeatureGridProps) {
  return (
    <section className="bg-cream text-dark px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {heading ? (
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12 text-center">
            {heading}
          </h2>
        ) : null}
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Heart;
            return (
              <div
                key={i}
                className="bg-white p-8 border-2 border-dark shadow-[6px_6px_0_0_#1a1a2e]"
              >
                <Icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-base opacity-80">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
