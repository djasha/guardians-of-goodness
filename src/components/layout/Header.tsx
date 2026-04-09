"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "@/lib/constants";
import { MobileNav } from "@/components/layout/MobileNav";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isHome = pathname === "/";
  // Pages with dark or colored hero backgrounds where nav needs white text
  const darkHeroPages = [
    "/", "/consultation", "/contact", "/catalogue",
    "/support", "/education", "/projects/tnr", "/projects/hbs",
    "/about",
  ];
  const hasDarkHero = darkHeroPages.some(
    (p) => p === "/" ? pathname === "/" : pathname.startsWith(p)
  );
  const hasHeroImage = isHome || pathname === "/consultation";
  const onDark = hasDarkHero && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-cream/95 backdrop-blur-sm shadow-[0_4px_0_0_rgba(26,26,46,0.06)]"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-16 lg:h-18" : hasHeroImage ? "h-20 lg:h-28" : "h-18 lg:h-20")}>
            {/* Logo — large on hero, shrinks on scroll */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logos/goglogo.png"
                alt="Guardians of Goodness"
                width={260}
                height={90}
                className={cn(
                  "w-auto transition-all duration-300",
                  scrolled ? "h-9 lg:h-11" : onDark ? "h-16 lg:h-22" : "h-10 lg:h-12",
                  onDark && "brightness-0 invert"
                )}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const hasChildren = "children" in item && item.children;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                        isActive(item.href)
                          ? onDark ? "text-secondary" : "text-primary bg-primary/10"
                          : onDark
                            ? "text-white/90 hover:text-white"
                            : "text-dark/70 hover:text-dark hover:bg-dark/5",
                      )}
                    >
                      {item.label}
                      {hasChildren && (
                        <svg
                          className="inline-block ml-1 w-3 h-3 opacity-40"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>

                    {hasChildren && (
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 min-w-[180px] neo-border neo-shadow bg-white z-50 overflow-hidden"
                            onMouseEnter={() => handleDropdownEnter(item.label)}
                            onMouseLeave={handleDropdownLeave}
                          >
                            {item.children!.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-3 text-sm font-semibold transition-colors",
                                  isActive(child.href)
                                    ? "text-primary bg-primary/5"
                                    : "text-dark/70 hover:text-dark hover:bg-secondary/10",
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <MagneticButton
                  href="/support"
                  variant={onDark ? "secondary" : "primary"}
                  size="sm"
                >
                  Support Us
                </MagneticButton>
              </div>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer text-dark"
                aria-label="Open menu"
              >
                <span className={cn("block w-6 h-[2.5px] rounded-full", onDark ? "bg-white" : "bg-dark")} />
                <span className={cn("block w-4 h-[2.5px] rounded-full self-end", onDark ? "bg-white" : "bg-dark")} />
                <span className={cn("block w-6 h-[2.5px] rounded-full", onDark ? "bg-white" : "bg-dark")} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
