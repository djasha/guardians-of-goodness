import type { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support Guardians of Goodness — your contribution helps us rescue and care for stray animals in Jordan.",
};

export default function SupportPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="neo-border-sm neo-shadow-sm bg-secondary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Support Us</span>
              </div>
              <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
                Your Support is Crucial
              </h1>
              <p className="text-lg sm:text-xl text-white/80">
                Every act of kindness makes a difference
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
                How You Can Help
              </h2>
              <p className="text-lg leading-relaxed text-dark/50 max-w-2xl mx-auto">
                We are non-profit, which means our abilities are defined by the
                level of your participation. We appreciate any contribution that
                may help us get closer to our goals.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-8 mb-16">
              <div className="relative bg-white neo-border neo-shadow neo-hover p-8 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-12 bg-primary" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                <div className="inline-flex items-center justify-center w-16 h-16 neo-border-sm bg-primary/10 mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-black text-dark mb-2">
                  Donate
                </h3>
                <p className="text-dark/50 text-sm">
                  Financial contributions help cover vet costs, food, and
                  shelter.
                </p>
              </div>

              <div className="relative bg-white neo-border neo-shadow neo-hover p-8 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-12 bg-secondary" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                <div className="inline-flex items-center justify-center w-16 h-16 neo-border-sm bg-secondary/10 mb-4">
                  <svg
                    className="w-8 h-8 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-black text-dark mb-2">
                  Volunteer
                </h3>
                <p className="text-dark/50 text-sm">
                  Give your time and skills to help with our rescue and care
                  programs.
                </p>
              </div>

              <div className="relative bg-white neo-border neo-shadow neo-hover p-8 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-12 h-12 bg-accent" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                <div className="inline-flex items-center justify-center w-16 h-16 neo-border-sm bg-accent/10 mb-4">
                  <svg
                    className="w-8 h-8 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-black text-dark mb-2">
                  Spread the Word
                </h3>
                <p className="text-dark/50 text-sm">
                  Share our mission with friends and family to raise awareness.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Card */}
          <ScrollReveal>
            <div className="relative bg-white neo-border neo-shadow p-10 sm:p-14 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-20 h-20 bg-primary" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
              <div className="absolute bottom-4 right-6 opacity-20">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 40 44" fill="currentColor">
                  <ellipse cx="20" cy="30" rx="10" ry="9" />
                  <circle cx="8" cy="16" r="4.5" />
                  <circle cx="17" cy="10" r="4" />
                  <circle cx="27" cy="10" r="4" />
                  <circle cx="35" cy="16" r="4.5" />
                </svg>
              </div>
              <div className="absolute top-6 right-8 opacity-15">
                <svg className="w-6 h-6 text-secondary" viewBox="0 0 40 44" fill="currentColor">
                  <ellipse cx="20" cy="30" rx="10" ry="9" />
                  <circle cx="8" cy="16" r="4.5" />
                  <circle cx="17" cy="10" r="4" />
                  <circle cx="27" cy="10" r="4" />
                  <circle cx="35" cy="16" r="4.5" />
                </svg>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-dark mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-dark/50 mb-8 max-w-lg mx-auto">
                Reach out and let us know how you would like to help. Every contribution counts.
              </p>
              <MagneticButton href="mailto:office@guardiansofgoodness.org" variant="primary" size="lg" external>
                Contact Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
