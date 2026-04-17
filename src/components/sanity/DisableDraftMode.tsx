"use client";

import Link from "next/link";
import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) return null;

  return (
    <Link
      href="/api/draft-mode/disable"
      prefetch={false}
      className="fixed bottom-4 right-4 z-[100] rounded-full bg-dark text-white px-4 py-2 text-xs font-semibold shadow-lg hover:bg-primary transition-colors"
    >
      Exit preview mode
    </Link>
  );
}
