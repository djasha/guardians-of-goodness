export type SafeHref = {
  href: string;
  isInternal: boolean;
  opensNewTab: boolean;
};

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);
const NEW_TAB_PROTOCOLS = new Set(["http:", "https:"]);
const UNSAFE_CHARACTERS = /[\u0000-\u001F\u007F\s]/;

export function resolveSafeHref(value: unknown): SafeHref | null {
  if (typeof value !== "string") return null;

  const href = value.trim();
  if (!href || UNSAFE_CHARACTERS.test(href)) return null;

  if ((href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#")) {
    return {
      href,
      isInternal: true,
      opensNewTab: false,
    };
  }

  try {
    const url = new URL(href);
    const protocol = url.protocol.toLowerCase();
    if (!ALLOWED_PROTOCOLS.has(protocol)) return null;

    return {
      href,
      isInternal: false,
      opensNewTab: NEW_TAB_PROTOCOLS.has(protocol),
    };
  } catch {
    return null;
  }
}
