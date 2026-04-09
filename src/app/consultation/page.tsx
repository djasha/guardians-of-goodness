import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description:
    "Request a free consultation with Guardians of Goodness — we are here to help you help stray animals in your community.",
};

export default function ConsultationPage() {
  return (
    <>
      {/* Hero — split layout: cat photo + form */}
      <section className="bg-primary relative overflow-hidden">
        {/* Background cat image — visible on right side */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/cat-closeup.jpg"
            alt=""
            fill
            className="object-cover object-[70%_30%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Heading + context */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-6 h-px bg-white/30" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Free Consultation
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6">
                We are here to help{" "}
                <span className="text-secondary">you</span> to help{" "}
                <span className="text-accent">them</span>
              </h1>

              <p className="text-white/85 text-lg leading-relaxed mb-10 max-w-md">
                Whether you have questions about TNR, want to set up a home
                based shelter, or need advice on caring for community cats, our
                team is ready to support you.
              </p>

              {/* Trust points */}
              <div className="space-y-3">
                {[
                  "Expert guidance on stray cat care",
                  "TNR program support and training",
                  "Home shelter setup assistance",
                  "Completely free of charge",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" viewBox="0 0 40 44" fill="currentColor">
                      <ellipse cx="20" cy="30" rx="10" ry="9" />
                      <circle cx="8" cy="16" r="4.5" />
                      <circle cx="17" cy="10" r="4" />
                      <circle cx="27" cy="10" r="4" />
                      <circle cx="35" cy="16" r="4.5" />
                    </svg>
                    <span className="text-white/80 text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form card */}
            <ScrollReveal>
              <div className="neo-border neo-shadow bg-cream p-7 sm:p-9">
                <h2 className="font-display text-2xl font-bold text-dark mb-1">
                  Request a Consultation
                </h2>
                <p className="text-dark/40 text-sm mb-6">
                  Fill out the form and we&apos;ll get back to you.
                </p>
                <ConsultationForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
