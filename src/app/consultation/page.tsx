import type { Metadata } from "next";
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
      {/* Hero Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Consultation
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Let us guide you on your journey to help animals
          </p>
        </div>
      </section>

      {/* Content + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                We are here to help{" "}
                <span className="text-primary">you</span> to help{" "}
                <span className="text-secondary">them</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Whether you have questions about TNR, want to set up a home
                based shelter, or need advice on caring for community cats, our
                team is ready to support you. Fill out the form below and we
                will get back to you as soon as possible.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
              <ConsultationForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
