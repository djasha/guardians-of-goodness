import type { Metadata } from "next";
import Image from "next/image";
import { DollarSign, Users, Share2, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PawPrint } from "@/components/ui/PawPrint";
import { client } from "@/sanity/client";
import { SUPPORT_PAGE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support Guardians of Goodness — your contribution helps us rescue and care for stray animals in Jordan.",
};

const defaultHelpMethods = [
  {
    title: "Donate",
    description: "Financial contributions help cover vet costs, food, and shelter.",
  },
  {
    title: "Volunteer",
    description: "Give your time and skills to help with our rescue and care programs.",
  },
  {
    title: "Spread the Word",
    description: "Share our mission with friends and family to raise awareness.",
  },
];

export default async function SupportPage() {
  const pageData = await client.fetch(SUPPORT_PAGE_QUERY, {}, { next: { tags: ["supportPage"] } }).catch(() => null);

  const heroTitle = pageData?.heroTitle || "Your Support is Crucial";
  const heroSubtext = pageData?.heroSubtext || "Every act of kindness makes a difference";
  const heroImage = pageData?.heroImage?.asset?.url || "/images/real-cats/cats-cuddling.jpg";
  const contentTitle = pageData?.contentTitle || "How You Can Help";
  const contentSubtext = pageData?.contentSubtext || "We are non-profit, which means our abilities are defined by the level of your participation. We appreciate any contribution that may help us get closer to our goals.";
  const helpMethods = pageData?.helpMethods || defaultHelpMethods;
  const ctaTitle = pageData?.ctaTitle || "Ready to Make a Difference?";
  const ctaText = pageData?.ctaText || "Reach out and let us know how you would like to help. Every contribution counts.";
  const ctaButtonText = pageData?.ctaButtonText || "Contact Us";
  const ctaButtonLink = pageData?.ctaButtonLink || "mailto:office@guardiansofgoodness.org";
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="neo-border-sm neo-shadow-sm bg-secondary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Support Us</span>
              </div>
              <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
                {heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-white/80">
                {heroSubtext}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Why It Matters</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-dark mb-6">
                {contentTitle}
              </h2>
              <p className="text-lg leading-relaxed text-dark/50 max-w-2xl mx-auto">
                {contentSubtext}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-8 mb-16">
              {helpMethods.map((method: { title: string; description: string }, index: number) => {
                const icons = [DollarSign, Users, Share2];
                const colors = ["primary", "secondary", "accent"];
                const Icon = icons[index % icons.length];
                const color = colors[index % colors.length];
                return (
                  <div key={method.title} className="relative bg-white neo-border neo-shadow neo-hover p-8 text-center overflow-hidden">
                    <div className={`absolute top-0 left-0 w-12 h-12 bg-${color}`} style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                    <div className={`inline-flex items-center justify-center w-16 h-16 neo-border-sm bg-${color}/10 mb-4`}>
                      <Icon className={`w-8 h-8 text-${color}`} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl font-black text-dark mb-2">
                      {method.title}
                    </h3>
                    <p className="text-dark/50 text-sm">
                      {method.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* CTA Card */}
          <ScrollReveal>
            <div className="relative bg-white neo-border neo-shadow p-10 sm:p-14 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-20 h-20 bg-primary" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
              <div className="absolute bottom-4 right-6 opacity-20">
                <PawPrint className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute top-6 right-8 opacity-15">
                <PawPrint className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-dark mb-4">
                {ctaTitle}
              </h3>
              <p className="text-dark/50 mb-8 max-w-lg mx-auto">
                {ctaText}
              </p>
              <MagneticButton href={ctaButtonLink} variant="primary" size="lg" external>
                {ctaButtonText}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
