import Image from "next/image";
import Link from "next/link";
import { SITE, SOCIAL } from "@/lib/constants";

const columns = [
  {
    title: "Navigate",
    links: [
      { label: "About Us", href: "/about" },
      { label: "CATalogue", href: "/catalogue" },
      { label: "Support Us", href: "/support" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { label: "TNR Project", href: "/projects/tnr" },
      { label: "Home Shelter", href: "/projects/hbs" },
      { label: "Education", href: "/education" },
      { label: "Consultation", href: "/consultation" },
    ],
  },
];

const socials = [
  { name: "Facebook", href: SOCIAL.facebook },
  { name: "Instagram", href: SOCIAL.instagram },
  { name: "LinkedIn", href: SOCIAL.linkedin },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Top accent bar */}
      <div className="h-2 bg-gradient-to-r from-secondary via-primary to-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16 sm:py-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logos/goglogo.png"
                alt="Guardians of Goodness"
                width={160}
                height={56}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-8">
              A non-profit organization dedicated to creating a friendly
              environment for cats and dogs in Jordan through rescue, medical
              care, and community education.
            </p>

            <a
              href={`mailto:${SITE.email}`}
              className="neo-border-sm neo-shadow-sm bg-primary/20 border-primary/30 neo-hover inline-flex items-center gap-3 px-5 py-3 text-white/70 hover:text-secondary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="text-sm font-bold">{SITE.email}</span>
            </a>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-secondary font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Address + Social */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              Find Us
            </h3>
            <p className="text-white/60 text-sm font-semibold mb-1">Amman, Jordan</p>
            <p className="text-white/40 text-sm mb-6">Jabal Amman, 1st Circle</p>

            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="neo-border-sm bg-white/5 border-white/10 neo-hover w-10 h-10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary/30 text-xs font-bold transition-all"
                >
                  {s.name.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            {new Date().getFullYear()} Guardians of Goodness. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Made with care for cats in Jordan
          </p>
        </div>
      </div>
    </footer>
  );
}
