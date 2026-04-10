import Image from "next/image";
import Link from "next/link";
import { SITE, SOCIAL } from "@/lib/constants";

const navLinks = [
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
    icon: <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  },
  {
    name: "Instagram",
    short: "IG",
    href: SOCIAL.instagram,
    icon: <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  },
  {
    name: "LinkedIn",
    short: "LI",
    href: SOCIAL.linkedin,
    icon: <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
];

/* Shared focus ring for all footer interactive elements */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary rounded-lg";

export function Footer() {
  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Decorative paw prints — hidden from assistive tech */}
      {[
        { top: "15%", right: "8%", size: 60, rot: 15 },
        { bottom: "20%", left: "60%", size: 40, rot: -25 },
      ].map((p, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className="absolute text-white opacity-[0.03]"
          style={{ top: (p as Record<string, unknown>).top as string | undefined, bottom: (p as Record<string, unknown>).bottom as string | undefined, left: (p as Record<string, unknown>).left as string | undefined, right: (p as Record<string, unknown>).right as string | undefined, width: p.size, height: p.size, transform: `rotate(${p.rot}deg)` }}
          viewBox="0 0 40 44"
          fill="currentColor"
        >
          <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
        </svg>
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
          <div className="flex items-center gap-3">
            <Link
              href="/consultation"
              className={`neo-border-sm neo-shadow-teal bg-secondary text-dark font-bold px-5 py-2.5 text-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--color-secondary)] border-secondary ${focusRing}`}
            >
              Get Involved
            </Link>
            <Link
              href="/catalogue"
              className={`neo-border-sm bg-white/10 text-white font-bold px-5 py-2.5 text-sm hover:bg-white/15 transition-all border-white/20 ${focusRing}`}
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
              A non-profit organization dedicated to creating a friendly
              environment for cats and dogs in Jordan through rescue, veterinary
              care, and community education.
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className={`inline-flex items-center gap-3 group ${focusRing}`}
            >
              <span className="neo-border-sm bg-primary/20 border-primary/30 w-10 h-10 flex items-center justify-center text-white/80 group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-colors">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-white/80 group-hover:text-secondary transition-colors">
                {SITE.email}
              </span>
            </a>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation" className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm text-white/80 hover:text-white font-medium transition-all inline-flex items-center gap-2 group ${focusRing}`}
                  >
                    <svg aria-hidden="true" className="w-2.5 h-2.5 text-primary/60 group-hover:text-secondary transition-colors" viewBox="0 0 40 44" fill="currentColor">
                      <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
                    </svg>
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
              <p className="text-white/90 text-sm font-semibold">Amman, Jordan</p>
              <p className="text-white/70 text-sm">Jabal Amman, 1st Circle</p>
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
            <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 40 44" fill="currentColor">
              <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
            </svg>
            <span className="text-xs">Made with care for cats in Jordan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
