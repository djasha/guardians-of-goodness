"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS, SOCIAL } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — neobrutalist */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[calc(100vw-2rem)] bg-cream neo-border border-r-0 rounded-r-none flex flex-col overflow-hidden"
            style={{ borderRight: "none", borderTopRightRadius: 0, borderBottomRightRadius: 0, boxShadow: "-6px 0 0 #1a1a2e" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b-3 border-dark">
              <Image
                src="/images/logos/goglogo.png"
                alt="GoG"
                width={100}
                height={36}
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={onClose}
                className="neo-border-sm neo-hover w-10 h-10 flex items-center justify-center bg-white text-dark cursor-pointer"
                aria-label="Close menu"
              >
                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-3.5 px-4 neo-border-sm bg-white text-dark font-bold text-base hover:bg-primary hover:text-white transition-all mb-2"
                    >
                      {item.label}
                      <svg className="w-4 h-4 opacity-30" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                    {"children" in item && item.children && (
                      <ul className="ml-4 mb-3 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="flex items-center gap-2 py-2.5 px-4 text-sm font-semibold text-dark/60 hover:text-primary transition-colors"
                            >
                              <svg className="w-3 h-3 text-secondary" viewBox="0 0 40 44" fill="currentColor">
                                <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
                              </svg>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <MagneticButton href="/support" variant="primary" size="md" className="w-full justify-center">
                  Support Us
                </MagneticButton>
              </div>
            </nav>

            {/* Bottom — socials */}
            <div className="p-5 border-t-3 border-dark bg-warm-gray">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-primary" viewBox="0 0 40 44" fill="currentColor">
                  <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-dark/40">Follow Us</span>
              </div>
              <div className="flex gap-2">
                {[
                  { name: "FB", href: SOCIAL.facebook },
                  { name: "IG", href: SOCIAL.instagram },
                  { name: "LI", href: SOCIAL.linkedin },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-border-sm neo-hover bg-white w-10 h-10 flex items-center justify-center text-dark/50 hover:text-primary text-xs font-bold transition-all"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
