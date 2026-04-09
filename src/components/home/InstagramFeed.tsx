"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SOCIAL } from "@/lib/constants";
import type { NormalizedPost } from "@/lib/instagram";

const fallbackImages = [
  { src: "/images/generated/hero-cat-hd.jpg", alt: "Rescue cat portrait" },
  { src: "/images/generated/hero-cat-cinematic.jpg", alt: "Cat close-up" },
  { src: "/images/generated/gentle-cat.jpg", alt: "Ginger cat relaxing" },
  { src: "/images/generated/cat-group.jpg", alt: "Cat on stairs" },
  { src: "/images/generated/rescue-cat.jpg", alt: "Kitten being held" },
  { src: "/images/content/cat-photo.jpg", alt: "Cats at shelter" },
  { src: "/images/cats/cat-card-1.png", alt: "Cat for adoption" },
  { src: "/images/cats/cat-card-2.png", alt: "Cat for adoption" },
];

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.substring(0, max).replace(/\s+\S*$/, "") + "…";
}

interface Props {
  posts?: NormalizedPost[];
}

export function InstagramFeed({ posts }: Props) {
  const reduced = useReducedMotion();
  const hasPosts = posts && posts.length > 0;

  const items = hasPosts
    ? posts.map((p) => ({
        id: p.id,
        src: p.src,
        alt: p.alt,
        caption: p.caption,
        postUrl: p.postUrl,
        isSanityImage: p.isSanityImage,
        lqip: p.lqip,
      }))
    : fallbackImages.map((img, i) => ({
        id: `fallback-${i}`,
        src: img.src,
        alt: img.alt,
        caption: undefined as string | undefined,
        postUrl: SOCIAL.instagram,
        isSanityImage: false,
        lqip: undefined as string | undefined,
      }));

  return (
    <section className="bg-cream py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="neo-border-sm neo-shadow-sm bg-pink text-white inline-block px-4 py-1.5 mb-5">
              <span className="text-xs font-bold uppercase tracking-widest">
                Follow Us
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-dark leading-tight">
              See our daily rescue stories on{" "}
              <span className="text-primary">Instagram</span>
            </h2>
          </div>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-border neo-shadow neo-hover bg-white px-6 py-3 font-bold text-sm text-dark inline-flex items-center gap-2 self-start"
          >
            <svg
              className="w-5 h-5 text-pink"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
            @guardians_of_goodness
          </a>
        </div>
      </div>

      {/* Photo grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, i) => {
            const W = reduced ? "div" : motion.div;
            const isLarge = i === 0 || i === 5;
            return (
              <W
                key={item.id}
                {...(!reduced && {
                  initial: { opacity: 0, y: 15 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.4, delay: i * 0.05 },
                })}
                className={isLarge ? "sm:col-span-2 sm:row-span-2" : ""}
              >
                <a
                  href={item.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-border neo-shadow-sm neo-hover block overflow-hidden relative group aspect-square"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay with caption */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/85 transition-colors duration-300 flex items-center justify-center p-4">
                    {item.caption ? (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white max-w-[90%]">
                        <span className="block text-3xl leading-none mb-2">
                          &ldquo;
                        </span>
                        <p className="text-sm sm:text-base font-medium leading-relaxed italic">
                          {truncate(item.caption, 120)}
                        </p>
                        <span className="block text-3xl leading-none mt-2">
                          &rdquo;
                        </span>
                      </div>
                    ) : (
                      <svg
                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
                      </svg>
                    )}
                  </div>
                </a>
              </W>
            );
          })}
        </div>
      </div>
    </section>
  );
}
