"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  ChevronRight,
  Stethoscope,
  Home as HomeIcon,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS, SOCIAL } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/SocialIcons";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Icon mapping for project sub-nav items. Centralised here so the
 * constants file stays data-only and NAV_ITEMS remains serialisable.
 */
const SUB_ICON: Record<string, LucideIcon> = {
  "/projects/tnr": Stethoscope,
  "/projects/hbs": HomeIcon,
  "/education": BookOpen,
};

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
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[calc(100vw-2rem)] bg-cream neo-border border-r-0 rounded-r-none flex flex-col overflow-hidden"
            style={{
              borderRight: "none",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              boxShadow: "-6px 0 0 var(--color-dark)",
            }}
          >
            {/* Top bar — theme toggle (left) + close (right) */}
            <div className="flex items-center justify-between p-4 border-b-3 border-dark">
              <ThemeToggle />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                title="Close menu"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full neo-border-sm bg-white text-dark hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all"
              >
                <X className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-3.5 px-4 neo-border-sm bg-white text-dark font-bold text-base hover:bg-primary hover:text-white transition-all mb-2"
                    >
                      {item.label}
                      <ChevronRight className="w-4 h-4 opacity-40" aria-hidden="true" />
                    </Link>
                    {"children" in item && item.children && (
                      <ul className="ml-4 mb-3 space-y-1">
                        {item.children.map((child) => {
                          const Icon = SUB_ICON[child.href] ?? ChevronRight;
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="flex items-center gap-2.5 py-2.5 px-4 text-sm font-semibold text-dark/60 hover:text-primary transition-colors"
                              >
                                <Icon
                                  className="w-4 h-4 text-secondary"
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
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
              <div className="mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-dark/60">
                  Follow Us
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook (opens in new tab)"
                  className="neo-border-sm neo-hover bg-white w-10 h-10 flex items-center justify-center text-dark/60 hover:text-primary transition-all"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (opens in new tab)"
                  className="neo-border-sm neo-hover bg-white w-10 h-10 flex items-center justify-center text-dark/60 hover:text-primary transition-all"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (opens in new tab)"
                  className="neo-border-sm neo-hover bg-white w-10 h-10 flex items-center justify-center text-dark/60 hover:text-primary transition-all"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
