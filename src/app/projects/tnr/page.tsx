import type { Metadata } from "next";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "TNR — Trap-Neuter-Return",
  description:
    "Learn about our Trap-Neuter-Return program — the most humane and efficient way to manage stray animal populations in Jordan.",
};

export default function TNRPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/real-cats/free-3.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/60 to-secondary/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="neo-border-sm neo-shadow-sm bg-dark text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Project</span>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white">
                  Trap-Neuter-Return (TNR)
                </h1>
                <svg className="w-10 h-11 text-white/30 hidden sm:block flex-shrink-0" viewBox="0 0 40 44" fill="currentColor">
                  <ellipse cx="20" cy="30" rx="10" ry="9" />
                  <circle cx="8" cy="16" r="4.5" />
                  <circle cx="17" cy="10" r="4" />
                  <circle cx="27" cy="10" r="4" />
                  <circle cx="35" cy="16" r="4.5" />
                </svg>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
                The most humane and efficient approach to managing stray animal populations and improving their quality of life.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content Section */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image Card */}
          <ScrollReveal>
            <div className="neo-border neo-shadow bg-white p-3">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/content/tnr-image.png"
                  alt="TNR process — Trap Neuter Return"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Text Content */}
          <div>
            <ScrollReveal>
              <div className="neo-border-sm neo-shadow-sm bg-secondary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">About TNR</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-dark mb-6">
                What is TNR?
              </h2>
              <p className="leading-relaxed text-dark/50 mb-6">
                Neutering stray animals is the most humane and efficient way to
                avoid overpopulation and improve the quality of lives of the
                animals at the same time. Each intact cat or dog roaming in the
                streets is a source of the rapidly growing number of stray
                animals in Jordan.
              </p>
            </ScrollReveal>

            {/* Key Fact Cards */}
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="neo-border-sm bg-cream p-4">
                  <p className="font-display font-black text-dark text-2xl mb-1">1-1.5</p>
                  <p className="text-dark/50 text-sm">years — average lifespan of an unhelped stray cat</p>
                </div>
                <div className="neo-border-sm bg-cream p-4">
                  <p className="font-display font-black text-secondary text-2xl mb-1">+3-5</p>
                  <p className="text-dark/50 text-sm">extra years TNR can add to a stray cat&apos;s life</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <p className="leading-relaxed text-dark/50 mb-6">
                Besides, the duration and quality of their lives are extremely
                low. An average stray cat lives from several months to 1-1.5
                years if not helped by humans. TNR can significantly improve
                quality of life and add at least a few more years to the
                lifespan.
              </p>
              <p className="leading-relaxed text-dark/50 mb-8">
                We encourage you to join our initiative and participate in
                neutering stray cats and dogs in your neighborhood. We can
                support you with knowledge and tools needed for this activity.
              </p>
            </ScrollReveal>

            {/* Paw Decoration */}
            <ScrollReveal>
              <div className="flex gap-2 mb-8">
                <svg className="w-5 h-5 text-secondary/30" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" /></svg>
                <svg className="w-5 h-5 text-secondary/30" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" /></svg>
                <svg className="w-5 h-5 text-secondary/30" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" /></svg>
              </div>

              <MagneticButton href="/consultation" variant="primary" size="md">
                Join Our TNR Initiative
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
