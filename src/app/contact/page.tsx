import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SOCIAL, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Guardians of Goodness — whether you want to adopt, volunteer, or just say hi.",
};

const socialLinks = [
  {
    name: "Facebook",
    href: SOCIAL.facebook,
    color: "bg-primary",
    hoverColor: "hover:bg-primary/90",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: SOCIAL.instagram,
    color: "bg-secondary",
    hoverColor: "hover:bg-secondary/90",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: SOCIAL.linkedin,
    color: "bg-accent",
    hoverColor: "hover:bg-accent/90",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/images/backgrounds/cat-background-5.png"
          alt="Contact Guardians of Goodness"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            We&apos;d love to hear from you — whether you want to adopt,
            volunteer, or just say hi.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Social Links */}
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Follow Us</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark">
                Connect With Us
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-16">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white neo-border neo-shadow neo-hover p-8 text-center"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 neo-border-sm ${link.color} ${link.hoverColor} text-white mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {link.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-dark">
                    {link.name}
                  </h3>
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Cat paw decoration */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-10">
              <svg className="w-5 h-5 text-primary/20" viewBox="0 0 40 44" fill="currentColor">
                <ellipse cx="20" cy="30" rx="10" ry="9" />
                <circle cx="8" cy="16" r="4.5" />
                <circle cx="17" cy="10" r="4" />
                <circle cx="27" cy="10" r="4" />
                <circle cx="35" cy="16" r="4.5" />
              </svg>
              <svg className="w-4 h-4 text-secondary/20" viewBox="0 0 40 44" fill="currentColor">
                <ellipse cx="20" cy="30" rx="10" ry="9" />
                <circle cx="8" cy="16" r="4.5" />
                <circle cx="17" cy="10" r="4" />
                <circle cx="27" cy="10" r="4" />
                <circle cx="35" cy="16" r="4.5" />
              </svg>
              <svg className="w-5 h-5 text-primary/20" viewBox="0 0 40 44" fill="currentColor">
                <ellipse cx="20" cy="30" rx="10" ry="9" />
                <circle cx="8" cy="16" r="4.5" />
                <circle cx="17" cy="10" r="4" />
                <circle cx="27" cy="10" r="4" />
                <circle cx="35" cy="16" r="4.5" />
              </svg>
            </div>
          </ScrollReveal>

          {/* Email & Address */}
          <ScrollReveal>
            <div className="text-center mb-6">
              <div className="neo-border-sm neo-shadow-sm bg-secondary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Reach Out</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white neo-border neo-shadow p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 neo-border-sm bg-primary/10 mb-4">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-dark mb-2">
                  Email
                </h3>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-primary hover:underline"
                >
                  {SITE.email}
                </a>
              </div>

              <div className="bg-white neo-border neo-shadow p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 neo-border-sm bg-secondary/10 mb-4">
                  <svg
                    className="w-7 h-7 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-dark mb-2">
                  Address
                </h3>
                <p className="text-dark/50">
                  Jordan, Amman, Jabal Amman, 1st Circle
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
