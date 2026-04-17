import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { SafePuckLink } from "@/puck/components/SafePuckLink";

type IconName = "Facebook" | "Instagram" | "LinkedIn";

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
};

export type SocialLinksProps = {
  heading: string;
  items: Array<{
    label: string;
    handle: string;
    href: string;
    icon: IconName;
  }>;
  tone: "cream" | "dark";
};

const toneClasses: Record<SocialLinksProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
};

export function SocialLinks({ heading, items, tone }: SocialLinksProps) {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map((item, i) => {
              const Icon = iconMap[item.icon] ?? InstagramIcon;
              return (
                <SafePuckLink
                  key={i}
                  href={item.href}
                  className="block border-2 border-dark p-6 shadow-[6px_6px_0_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a2e] transition-transform bg-white text-dark"
                >
                  <Icon className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="font-display text-xl font-bold mb-1">
                    {item.label}
                  </h3>
                  {item.handle ? (
                    <p className="text-sm opacity-70">{item.handle}</p>
                  ) : null}
                </SafePuckLink>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
