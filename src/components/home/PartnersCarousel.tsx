"use client";

import Image from "next/image";

const partners = [
  { name: "Cat Para", logo: "/images/partners/cat-para.jpeg" },
  { name: "Healthy Pet", logo: "/images/partners/healthy-pet.png" },
  { name: "Shirazki", logo: "/images/partners/shirazki.jpeg" },
  { name: "PEAK Vet Center", logo: "/images/partners/peak.png" },
  { name: "Vet Clinic", logo: "/images/partners/vet-clinic.jpeg" },
  { name: "Amman Vet Clinic", logo: "/images/partners/amman-vet-clinic.jpeg" },
  { name: "Jafar Alrefa", logo: "/images/partners/jafar-alrefa.jpeg" },
];

export function PartnersCarousel() {
  const doubled = [...partners, ...partners];

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5">
          <span className="text-xs font-bold uppercase tracking-widest">Our Partners</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 mx-3 neo-border neo-shadow-sm neo-hover bg-white w-44 h-24 flex items-center justify-center p-4"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={50}
                className="object-contain max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
