"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "@/lib/constants";
import type { NavItem } from "@/sanity/lib/siteChrome";
import { MobileNav } from "@/components/layout/MobileNav";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

type HeaderProps = {
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export function Header({ navItems, ctaLabel, ctaHref }: HeaderProps = {}) {
  const resolvedNav: ReadonlyArray<NavItem | (typeof NAV_ITEMS)[number]> =
    navItems && navItems.length > 0 ? navItems : NAV_ITEMS;
  const resolvedCtaLabel = ctaLabel || "Support Us";
  const resolvedCtaHref = ctaHref || "/support";
  const pathname = usePathname();
  const { theme } = useTheme();
  const isMystical = theme === "mystical";
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

  const closeDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown((current) => (current === label ? null : label));
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
  // In mystical mode, nav text is always light (dark bg everywhere)
  // but logo switches from white (hero) to colored (scrolled) for visual distinction
  const onDark = isMystical ? true : (hasDarkHero && !scrolled);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? isMystical
              ? "bg-dark/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(156,39,176,0.15)]"
              : "bg-cream/95 backdrop-blur-sm shadow-[0_4px_0_0_rgba(26,26,46,0.06)]"
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
                width={787}
                height={572}
                className={cn(
                  "w-auto transition-all duration-300",
                  scrolled ? "h-9 lg:h-11" : onDark ? "h-16 lg:h-22" : "h-10 lg:h-12",
                  (isMystical ? !scrolled : (onDark && !scrolled)) && "brightness-0 invert"
                )}
                style={{ width: "auto" }}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {resolvedNav.map((item) => {
                const hasChildren = "children" in item && item.children && item.children.length > 0;
                const dropdownId = `desktop-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`;
                const linkClassName = cn(
                  "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                  isActive(item.href)
                    ? onDark ? "text-secondary" : "text-primary bg-primary/10"
                    : onDark
                      ? "text-white/90 hover:text-white"
                      : "text-dark/70 hover:text-dark hover:bg-dark/5",
                );

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        closeDropdown();
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        closeDropdown();
                      }
                    }}
                  >
                    {hasChildren ? (
                      <div className={cn(linkClassName, "flex items-center gap-1 px-0 py-0 overflow-hidden")}>
                        <Link
                          href={item.href}
                          className="py-2 pl-3.5 pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={openDropdown === item.label}
                          aria-controls={dropdownId}
                          className="py-2 pl-1 pr-3.5 rounded-r-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                          onClick={() => toggleDropdown(item.label)}
                        >
                          <ChevronDown
                            className={cn(
                              "w-3 h-3 opacity-50 transition-transform duration-200",
                              openDropdown === item.label && "rotate-180",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    ) : (
                      <Link href={item.href} className={linkClassName}>
                        {item.label}
                      </Link>
                    )}

                    {hasChildren && "children" in item && item.children && (
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            id={dropdownId}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className={cn(
                              "absolute top-full left-0 mt-2 min-w-[180px] neo-border neo-shadow z-50 overflow-hidden",
                              isMystical ? "bg-dark" : "bg-white",
                            )}
                            onMouseEnter={() => handleDropdownEnter(item.label)}
                            onMouseLeave={handleDropdownLeave}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-inset",
                                  isActive(child.href)
                                    ? "text-primary bg-primary/5"
                                    : isMystical
                                      ? "text-white/70 hover:text-white hover:bg-secondary/10"
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
              {/* Theme toggle — desktop only; mobile uses the one inside MobileNav */}
              <ThemeToggle className="hidden lg:inline-flex" />

              <div className="hidden sm:block">
                <MagneticButton
                  href={resolvedCtaHref}
                  variant={onDark ? "secondary" : "primary"}
                  size="sm"
                >
                  {resolvedCtaLabel}
                </MagneticButton>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 cursor-pointer text-dark touch-manipulation"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <span className={cn(
                  "block w-6 h-[2.5px] rounded-full transition-all duration-300 origin-center",
                  onDark ? "bg-pure-white" : "bg-dark",
                  mobileOpen && "rotate-45 translate-y-[5.5px]"
                )} />
                <span className={cn(
                  "block w-4 h-[2.5px] rounded-full self-end transition-all duration-300",
                  onDark ? "bg-pure-white" : "bg-dark",
                  mobileOpen && "opacity-0 scale-0"
                )} />
                <span className={cn(
                  "block w-6 h-[2.5px] rounded-full transition-all duration-300 origin-center",
                  onDark ? "bg-pure-white" : "bg-dark",
                  mobileOpen && "-rotate-45 -translate-y-[5.5px]"
                )} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
