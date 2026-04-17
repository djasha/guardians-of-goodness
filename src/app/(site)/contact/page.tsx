import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PawPrint } from "@/components/ui/PawPrint";
import { client } from "@/sanity/client";
import { CONTACT_PAGE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Guardians of Goodness — whether you want to adopt, volunteer, or just say hi.",
};

const socialLinks = [
  {
    name: "Instagram",
    handle: "@guardians_of_goodness",
    href: "https://www.instagram.com/guardians_of_goodness/",
    accentColor: "bg-secondary",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    icon: <InstagramIcon className="w-8 h-8" />,
  },
  {
    name: "Facebook",
    handle: "Guardians of Goodness",
    href: "https://www.facebook.com/guardiansofgoodness/",
    accentColor: "bg-dark",
    iconBg: "bg-dark/10",
    iconColor: "text-dark",
    icon: <FacebookIcon className="w-8 h-8" />,
  },
  {
    name: "LinkedIn",
    handle: "Guardians of Goodness",
    href: "https://www.linkedin.com/company/guardians-of-goodness/",
    accentColor: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    icon: <LinkedInIcon className="w-8 h-8" />,
  },
];

export default async function ContactPage() {
  const pageData = await client.fetch(CONTACT_PAGE_QUERY, {}, { next: { tags: ["contactPage"] } }).catch(() => null);

  const heroTitle = pageData?.heroTitle || "Get in Touch";
  const heroSubtext = pageData?.heroSubtext || "We\u2019d love to hear from you \u2014 whether you want to adopt, volunteer, or just say hi.";
  const heroImage = pageData?.heroImage?.asset?.url || "/images/real-cats/tabby-portrait.jpg";
  const email = pageData?.emailOverride || "office@guardiansofgoodness.org";
  const address = pageData?.addressOverride || "Amman, Jordan \u2014 Jabal Amman, 1st Circle";
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/65 to-dark/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Contact</span>
              </div>
              <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
                {heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-white/70">
                {heroSubtext}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Social Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="neo-border-sm neo-shadow-sm bg-secondary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Follow Us</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-dark">
                Connect With Us
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-6 mb-16">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white neo-border neo-shadow neo-hover p-8 text-center overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-12 h-12 ${link.accentColor}`} style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 neo-border-sm ${link.iconBg} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <span className={link.iconColor}>{link.icon}</span>
                  </div>
                  <h3 className="font-display text-xl font-black text-dark mb-1">
                    {link.name}
                  </h3>
                  <p className="text-dark/60 text-sm">{link.handle}</p>
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Paw decoration */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-10">
              <PawPrint className="w-5 h-5 text-primary/20" />
              <PawPrint className="w-4 h-4 text-secondary/20" />
              <PawPrint className="w-5 h-5 text-primary/20" />
            </div>
          </ScrollReveal>

          {/* Email & Address */}
          <ScrollReveal>
            <div className="text-center mb-6">
              <div className="neo-border-sm neo-shadow-sm bg-accent text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Reach Out</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white neo-border neo-shadow p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 neo-border-sm bg-primary/10 mb-4">
                  <Mail className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-black text-dark mb-2">
                  Email
                </h3>
                <a
                  href={`mailto:${email}`}
                  className="text-primary hover:underline"
                >
                  {email}
                </a>
              </div>

              <div className="bg-white neo-border neo-shadow p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 neo-border-sm bg-secondary/10 mb-4">
                  <MapPin className="w-7 h-7 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-black text-dark mb-2">
                  Address
                </h3>
                <p className="text-dark/60">
                  {address}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
