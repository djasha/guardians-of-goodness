"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";

export function DuplicatePageButton({
  pageId,
  pageTitle,
}: {
  pageId: string;
  pageTitle: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();

  async function handleClick() {
    if (busy) return;
    const confirmed = window.confirm(`Duplicate "${pageTitle}"?`);
    if (!confirmed) return;

    setBusy(true);
    try {
      const res = await fetch("/api/puck/duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId: pageId }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Failed" }));
        window.alert(`Duplicate failed: ${error ?? res.statusText}`);
        return;
      }
      const { _id } = await res.json();
      startTransition(() => {
        router.refresh();
        router.push(`/admin/editor/${encodeURIComponent(_id)}`);
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-label={`Duplicate ${pageTitle}`}
      className="flex items-center justify-center w-12 lg:w-10 border-l-2 border-dark hover:bg-cream disabled:opacity-50 touch-manipulation"
    >
      <Copy className="w-4 h-4" strokeWidth={2} />
    </button>
  );
}
