import { Mail, MapPin, Phone, Clock } from "lucide-react";

const iconMap = {
  Mail,
  MapPin,
  Phone,
  Clock,
} as const;

export type ContactInfoProps = {
  heading: string;
  items: Array<{
    icon: keyof typeof iconMap;
    title: string;
    primary: string;
    secondary: string;
    href: string;
  }>;
  tone: "cream" | "dark";
};

const toneClasses: Record<ContactInfoProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
};

export function ContactInfo({ heading, items, tone }: ContactInfoProps) {
  const hasItems = Array.isArray(items) && items.length > 0;
  return (
    <section className={`${toneClasses[tone]} px-6 py-16`}>
      <div className="max-w-5xl mx-auto">
        {heading ? (
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
            {heading}
          </h2>
        ) : null}
        {hasItems ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Mail;
              const content = (
                <>
                  <Icon className="w-7 h-7 mb-4 text-primary" strokeWidth={1.8} />
                  <h3 className="font-display text-lg font-bold mb-2">
                    {item.title}
                  </h3>
                  {item.primary ? (
                    <p className="text-base break-words">{item.primary}</p>
                  ) : null}
                  {item.secondary ? (
                    <p className="text-sm opacity-70 mt-1">{item.secondary}</p>
                  ) : null}
                </>
              );
              return item.href ? (
                <a
                  key={i}
                  href={item.href}
                  className="block border-2 border-dark p-6 shadow-[6px_6px_0_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a2e] transition-transform bg-white text-dark"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={i}
                  className="border-2 border-dark p-6 shadow-[6px_6px_0_0_#1a1a2e] bg-white text-dark"
                >
                  {content}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
