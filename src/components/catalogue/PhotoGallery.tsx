"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoGalleryProps {
  photos: { asset: { url: string; metadata?: { lqip?: string } } }[];
  name: string;
}

export function PhotoGallery({ photos, name }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentPhoto = photos[selectedIndex];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") setLightboxOpen(false);
    if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
    if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev + 1) % photos.length);
  }, [lightboxOpen, photos.length]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-warm-gray cursor-zoom-in group"
        >
          <Image
            src={currentPhoto.asset.url}
            alt={`${name} photo ${selectedIndex + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder={currentPhoto.asset.metadata?.lqip ? "blur" : undefined}
            blurDataURL={currentPhoto.asset.metadata?.lqip}
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Click to enlarge
          </div>
        </button>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={cn(
                  "relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200",
                  i === selectedIndex
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={photo.asset.url}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors touch-manipulation"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
                  }}
                  className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev + 1) % photos.length);
                  }}
                  className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentPhoto.asset.url}
                alt={`${name} photo ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selectedIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
