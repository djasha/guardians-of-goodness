import Link from "next/link";
import type { ReactNode } from "react";
import { resolveSafeHref, type SafeHref } from "@/lib/safeHref";

type SafePuckLinkProps = {
  href: unknown;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

function mergeRel(existing: string | undefined, required: string) {
  const values = new Set([...(existing?.split(/\s+/) ?? []), ...required.split(/\s+/)]);
  values.delete("");
  return Array.from(values).join(" ");
}

export function SafePuckLink({
  href,
  children,
  className,
  ariaLabel,
  target,
  rel,
}: SafePuckLinkProps) {
  const safeHref = resolveSafeHref(href);
  if (!safeHref) return null;

  return (
    <ResolvedSafePuckLink
      safeHref={safeHref}
      className={className}
      ariaLabel={ariaLabel}
      target={target}
      rel={rel}
    >
      {children}
    </ResolvedSafePuckLink>
  );
}

export function ResolvedSafePuckLink({
  safeHref,
  children,
  className,
  ariaLabel,
  target,
  rel,
}: Omit<SafePuckLinkProps, "href"> & { safeHref: SafeHref }) {
  if (safeHref.isInternal) {
    return (
      <Link href={safeHref.href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  const targetAttr = target ?? (safeHref.opensNewTab ? "_blank" : undefined);
  const relAttr =
    targetAttr === "_blank" ? mergeRel(rel, "noopener noreferrer") : rel;

  return (
    <a
      href={safeHref.href}
      target={targetAttr}
      rel={relAttr}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
