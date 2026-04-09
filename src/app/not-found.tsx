import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto">
        {/* Cat paw SVG decoration */}
        <div className="flex justify-center mb-6">
          <svg className="w-28 h-28 text-primary" viewBox="0 0 40 44" fill="currentColor">
            <ellipse cx="20" cy="30" rx="10" ry="9" />
            <circle cx="8" cy="16" r="4.5" />
            <circle cx="17" cy="10" r="4" />
            <circle cx="27" cy="10" r="4" />
            <circle cx="35" cy="16" r="4.5" />
          </svg>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg leading-relaxed text-dark/50 mb-10">
          Looks like a cat knocked this page off the table. It might have
          existed at some point, but it seems to have wandered off.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton href="/" variant="primary" size="md">
            Back to Home
          </MagneticButton>
          <MagneticButton href="/catalogue" variant="outline" size="md">
            Browse CATalogue
          </MagneticButton>
        </div>

        {/* Playful paw decoration */}
        <div className="mt-12 flex justify-center gap-3 opacity-30">
          <svg className="w-5 h-5 text-primary/20" viewBox="0 0 40 44" fill="currentColor">
            <ellipse cx="20" cy="30" rx="10" ry="9" />
            <circle cx="8" cy="16" r="4.5" />
            <circle cx="17" cy="10" r="4" />
            <circle cx="27" cy="10" r="4" />
            <circle cx="35" cy="16" r="4.5" />
          </svg>
          <svg className="w-4 h-4 text-primary/20 rotate-12 translate-y-1" viewBox="0 0 40 44" fill="currentColor">
            <ellipse cx="20" cy="30" rx="10" ry="9" />
            <circle cx="8" cy="16" r="4.5" />
            <circle cx="17" cy="10" r="4" />
            <circle cx="27" cy="10" r="4" />
            <circle cx="35" cy="16" r="4.5" />
          </svg>
          <svg className="w-3 h-3 text-primary/20 rotate-[25deg] translate-y-2" viewBox="0 0 40 44" fill="currentColor">
            <ellipse cx="20" cy="30" rx="10" ry="9" />
            <circle cx="8" cy="16" r="4.5" />
            <circle cx="17" cy="10" r="4" />
            <circle cx="27" cy="10" r="4" />
            <circle cx="35" cy="16" r="4.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
