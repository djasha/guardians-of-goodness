import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { PawPrint } from "@/components/ui/PawPrint";
import { client } from "@/sanity/client";
import { CONSULTATION_PAGE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description:
    "Request a free consultation with Guardians of Goodness — we are here to help you help stray animals in your community.",
};

const defaultTrustPoints = [
  "Expert guidance on stray cat care",
  "TNR program support and training",
  "Home shelter setup assistance",
  "Completely free of charge",
];

export default async function ConsultationPage() {
  const pageData = await client.fetch(CONSULTATION_PAGE_QUERY, {}, { next: { tags: ["consultationPage"] } }).catch(() => null);

  const heroTitle = pageData?.heroTitle || "We are here to help you to help them";
  const heroSubtext = pageData?.heroSubtext || "Whether you have questions about TNR, want to set up a home based shelter, or need advice on caring for community cats, our team is ready to support you.";
  const heroImage = pageData?.heroImage?.asset?.url || "/images/generated/cat-closeup.jpg";
  const formTitle = pageData?.formTitle || "Request a Consultation";
  const formSubtext = pageData?.formSubtext || "Fill out the form and we\u2019ll get back to you.";
  const trustPoints = pageData?.trustPoints?.map((p: { text: string }) => p.text) || defaultTrustPoints;
  return (
    <>
      {/* Hero — split layout: cat photo + form */}
      <section className="bg-primary relative overflow-hidden">
        {/* Background cat image — visible on right side */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
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
                {heroTitle === "We are here to help you to help them" ? (
                  <>
                    We are here to help{" "}
                    <span className="text-secondary">you</span> to help{" "}
                    <span className="text-accent">them</span>
                  </>
                ) : (
                  heroTitle
                )}
              </h1>

              <p className="text-white/85 text-lg leading-relaxed mb-10 max-w-md">
                {heroSubtext}
              </p>

              {/* Trust points */}
              <div className="space-y-3">
                {trustPoints.map((point: string) => (
                  <div key={point} className="flex items-center gap-3">
                    <PawPrint className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="text-white/80 text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form card */}
            <ScrollReveal>
              <div className="neo-border neo-shadow bg-cream p-7 sm:p-9">
                <h2 className="font-display text-2xl font-bold text-dark mb-1">
                  {formTitle}
                </h2>
                <p className="text-dark/60 text-sm mb-6">
                  {formSubtext}
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
