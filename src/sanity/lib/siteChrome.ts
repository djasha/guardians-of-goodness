import { cache } from "react";
import { client } from "@/sanity/client";

export type NavItem = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

export type SiteChrome = {
  headerNav: NavItem[];
  headerCtaLabel: string;
  headerCtaHref: string;
  footerDescription: string;
  footerAddressLine1: string;
  footerAddressLine2: string;
  footerNav: NavItem[];
  footerLegal: string;
};

const FALLBACK_HEADER_NAV: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Projects",
    href: "/projects/tnr",
    children: [
      { label: "TNR Program", href: "/projects/tnr" },
      { label: "Home Shelter", href: "/projects/hbs" },
      { label: "Education", href: "/education" },
    ],
  },
  { label: "CATalogue", href: "/catalogue" },
  { label: "Consultation", href: "/consultation" },
  { label: "Contact", href: "/contact" },
];

const FALLBACK_FOOTER_NAV: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "CATalogue", href: "/catalogue" },
  { label: "TNR Project", href: "/projects/tnr" },
  { label: "Home Shelter", href: "/projects/hbs" },
  { label: "Education", href: "/education" },
  { label: "Support Us", href: "/support" },
  { label: "Contact", href: "/contact" },
];

export const FALLBACK_CHROME: SiteChrome = {
  headerNav: FALLBACK_HEADER_NAV,
  headerCtaLabel: "Support Us",
  headerCtaHref: "/support",
  footerDescription:
    "A non-profit organization dedicated to creating a friendly environment for cats and dogs in Jordan through rescue, veterinary care, and community education.",
  footerAddressLine1: "Amman, Jordan",
  footerAddressLine2: "Jabal Amman, 1st Circle",
  footerNav: FALLBACK_FOOTER_NAV,
  footerLegal: "Made with care for cats in Jordan",
};

const SITE_CHROME_QUERY = `*[_type == "siteChrome"][0]{
  headerCtaLabel,
  headerCtaHref,
  footerDescription,
  footerAddressLine1,
  footerAddressLine2,
  footerLegal,
  "headerNav": headerNav[]{
    label,
    "href": coalesce(page->slug.current ? "/" + page->slug.current : href, href),
    "children": children[]{
      label,
      "href": coalesce(page->slug.current ? "/" + page->slug.current : href, href)
    }
  },
  "footerNav": footerNav[]{
    label,
    "href": coalesce(page->slug.current ? "/" + page->slug.current : href, href)
  }
}`;

type ChromeDoc = Partial<SiteChrome> | null;

function hasItems(arr: NavItem[] | undefined): arr is NavItem[] {
  return Array.isArray(arr) && arr.length > 0;
}

export const getSiteChrome = cache(async (): Promise<SiteChrome> => {
  let doc: ChromeDoc = null;
  try {
    doc = await client.fetch(SITE_CHROME_QUERY);
  } catch {
    doc = null;
  }
  if (!doc) return FALLBACK_CHROME;
  return {
    headerNav: hasItems(doc.headerNav) ? doc.headerNav : FALLBACK_CHROME.headerNav,
    headerCtaLabel: doc.headerCtaLabel || FALLBACK_CHROME.headerCtaLabel,
    headerCtaHref: doc.headerCtaHref || FALLBACK_CHROME.headerCtaHref,
    footerDescription: doc.footerDescription || FALLBACK_CHROME.footerDescription,
    footerAddressLine1: doc.footerAddressLine1 || FALLBACK_CHROME.footerAddressLine1,
    footerAddressLine2: doc.footerAddressLine2 || FALLBACK_CHROME.footerAddressLine2,
    footerNav: hasItems(doc.footerNav) ? doc.footerNav : FALLBACK_CHROME.footerNav,
    footerLegal: doc.footerLegal || FALLBACK_CHROME.footerLegal,
  };
});
