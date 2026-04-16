"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

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
  const [showAll, setShowAll] = useState(false);
  const doubled = [...partners, ...partners];

  return (
    <section className="relative bg-cream py-10 sm:py-14 section-fade-in section-to-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex items-center justify-between">
        <button
          onClick={() => setShowAll(true)}
          className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 neo-hover cursor-pointer group"
        >
          <span className="text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
            Our Partners
            <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </span>
        </button>
        <p className="text-dark/60 text-xs hidden sm:block">Click to see all partners</p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-cream to-transparent z-10" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((partner, i) => (
            <button
              key={`${partner.name}-${i}`}
              onClick={() => setShowAll(true)}
              className="flex-shrink-0 mx-3 neo-border neo-shadow-sm neo-hover bg-white w-44 h-24 flex items-center justify-center p-4 cursor-pointer"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={50}
                className="object-contain max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Partners Popup */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={() => setShowAll(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="neo-border neo-shadow bg-cream p-8 sm:p-10 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-dark">
                    Our Partners
                  </h2>
                  <p className="text-dark/60 text-sm mt-1">
                    Veterinary clinics and organizations we work with
                  </p>
                </div>
                <button
                  onClick={() => setShowAll(false)}
                  className="neo-border-sm neo-hover w-10 h-10 flex items-center justify-center bg-white text-dark/60 hover:text-dark flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="neo-border neo-shadow-sm bg-white p-5 flex flex-col items-center gap-3 neo-hover"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={100}
                      height={60}
                      className="object-contain h-14 w-auto"
                    />
                    <span className="text-dark font-bold text-xs text-center">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
