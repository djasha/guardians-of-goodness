import Image from "next/image";
import Link from "next/link";
import { SITE, SOCIAL } from "@/lib/constants";
import type { NavItem } from "@/sanity/lib/siteChrome";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { PawPrint } from "@/components/ui/PawPrint";

const DEFAULT_NAV_LINKS: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "CATalogue", href: "/catalogue" },
  { label: "TNR Project", href: "/projects/tnr" },
  { label: "Home Shelter", href: "/projects/hbs" },
  { label: "Education", href: "/education" },
  { label: "Support Us", href: "/support" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "Facebook",
    short: "FB",
    href: SOCIAL.facebook,
    icon: <FacebookIcon className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    short: "IG",
    href: SOCIAL.instagram,
    icon: <InstagramIcon className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    short: "LI",
    href: SOCIAL.linkedin,
    icon: <LinkedInIcon className="w-5 h-5" />,
  },
];

/* Shared focus ring for all footer interactive elements */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary rounded-lg";

type FooterProps = {
  navItems?: NavItem[];
  description?: string;
  addressLine1?: string;
  addressLine2?: string;
  legal?: string;
};

export function Footer({
  navItems,
  description,
  addressLine1,
  addressLine2,
  legal,
}: FooterProps = {}) {
  const navLinks = navItems && navItems.length > 0 ? navItems : DEFAULT_NAV_LINKS;
  const footerDescription =
    description ||
    "A non-profit organization dedicated to creating a friendly environment for cats and dogs in Jordan through rescue, veterinary care, and community education.";
  const line1 = addressLine1 || "Amman, Jordan";
  const line2 = addressLine2 || "Jabal Amman, 1st Circle";
  const legalLine = legal || "Made with care for cats in Jordan";
  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Decorative paw prints — hidden from assistive tech */}
      {[
        { top: "15%", right: "8%", size: 60, rot: 15 },
        { bottom: "20%", left: "60%", size: 40, rot: -25 },
      ].map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute text-white opacity-[0.03] pointer-events-none"
          style={{ top: (p as Record<string, unknown>).top as string | undefined, bottom: (p as Record<string, unknown>).bottom as string | undefined, left: (p as Record<string, unknown>).left as string | undefined, right: (p as Record<string, unknown>).right as string | undefined, width: p.size, height: p.size, transform: `rotate(${p.rot}deg)` }}
        >
          <PawPrint className="w-full h-full" />
        </span>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
        {/* Top — Logo + CTAs */}
        <div className="neo-border bg-dark-light p-6 sm:p-8 mb-12 border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className={focusRing}>
              <Image
                src="/images/logos/goglogo.png"
                alt="Guardians of Goodness — Home"
                width={160}
                height={56}
                className="h-12 sm:h-14 w-auto brightness-0 invert"
              />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href="/consultation"
              className={`neo-border-sm neo-shadow-teal bg-secondary text-dark font-bold px-5 py-3 text-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--color-secondary)] border-secondary flex-1 sm:flex-none text-center min-h-11 inline-flex items-center justify-center touch-manipulation ${focusRing}`}
            >
              Get Involved
            </Link>
            <Link
              href="/catalogue"
              className={`neo-border-sm bg-white/10 text-white font-bold px-5 py-3 text-sm hover:bg-white/15 transition-all border-white/20 flex-1 sm:flex-none text-center min-h-11 inline-flex items-center justify-center touch-manipulation ${focusRing}`}
            >
              Adopt a Cat
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Description + Email */}
          <div className="md:col-span-5">
            <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-6">
              {footerDescription}
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className={`inline-flex items-center gap-3 group min-h-11 py-1 touch-manipulation break-all ${focusRing}`}
            >
              <span className="neo-border-sm bg-primary/20 border-primary/30 w-10 h-10 flex items-center justify-center text-white/80 group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-colors">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-secondary transition-colors break-all">
                {SITE.email}
              </span>
            </a>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation" className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 md:mb-5">
              Quick Links
            </h3>
            <ul className="space-y-0.5 md:space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm text-white/80 hover:text-white active:text-white font-medium transition-all inline-flex items-center gap-2 group py-2.5 md:py-1 min-h-11 md:min-h-0 touch-manipulation ${focusRing}`}
                  >
                    <PawPrint className="w-2.5 h-2.5 text-primary/60 group-hover:text-secondary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Address + Socials */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-5">
              Find Us
            </h3>
            <address className="neo-border-sm bg-white/5 border-white/10 p-4 mb-6 not-italic">
              <p className="text-white/90 text-sm font-semibold">{line1}</p>
              {line2 ? <p className="text-white/70 text-sm">{line2}</p> : null}
            </address>

            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} (opens in new tab)`}
                  className={`neo-border-sm bg-white/5 border-white/10 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all ${focusRing}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="neo-border-sm border-white/10 bg-white/5 py-4 px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/70 text-xs">
            &copy; {new Date().getFullYear()} Guardians of Goodness. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/70">
            <PawPrint className="w-3.5 h-3.5" />
            <span className="text-xs">{legalLine}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
