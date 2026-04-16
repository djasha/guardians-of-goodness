"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SOCIAL } from "@/lib/constants";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import type { NormalizedPost } from "@/lib/instagram";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.substring(0, max).replace(/\s+\S*$/, "") + "…";
}

interface Props {
  posts?: NormalizedPost[];
}

export function InstagramFeed({ posts }: Props) {
  const reduced = useReducedMotion();

  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative bg-cream py-20 sm:py-28 overflow-hidden section-fade-in section-from-dark section-to-dark">
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
            <InstagramIcon className="w-5 h-5 text-pink" />
            @guardians_of_goodness
          </a>
        </div>
      </div>

      {/* Photo grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {posts.map((item, i) => {
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
                  {item.isSanityImage ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes={
                        isLarge
                          ? "(max-width: 640px) 100vw, 50vw"
                          : "(max-width: 640px) 50vw, 25vw"
                      }
                      {...(item.lqip && {
                        placeholder: "blur" as const,
                        blurDataURL: item.lqip,
                      })}
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

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
                      <InstagramIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
