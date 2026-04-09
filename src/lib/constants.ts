export const SITE = {
  name: "Guardians of Goodness",
  tagline: "For Animal Welfare",
  email: "office@guardiansofgoodness.org",
  address: "Amman, Jordan — Jabal Amman, 1st Circle",
  url: "https://guardiansofgoodness.org",
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/guardiansofgoodness/",
  instagram: "https://www.instagram.com/guardians_of_goodness/",
  linkedin: "https://www.linkedin.com/company/guardians-of-goodness/",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Projects",
    href: "/projects/tnr",
    children: [
      { label: "TNR", href: "/projects/tnr" },
      { label: "HBS", href: "/projects/hbs" },
    ],
  },
  { label: "CATalogue", href: "/catalogue" },
  {
    label: "Services",
    href: "/education",
    children: [
      { label: "Education", href: "/education" },
    ],
  },
  { label: "Support Us", href: "/support" },
  { label: "Contact", href: "/contact" },
] as const;
