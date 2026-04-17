"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[100] rounded-full bg-dark text-white px-4 py-2 text-xs font-semibold shadow-lg hover:bg-primary transition-colors"
    >
      Exit preview mode
    </a>
  );
}
