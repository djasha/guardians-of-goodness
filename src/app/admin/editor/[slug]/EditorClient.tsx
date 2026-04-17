"use client";

import { useState } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig, emptyPuckData, type PuckData } from "@/puck/config";

type Props = {
  slug: string;
  title: string;
  description: string;
  initialData: PuckData | null;
};

export function EditorClient({ slug, title, description, initialData }: Props) {
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePublish(data: PuckData) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/puck/${slug}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ puckData: data, title, description }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `${res.status} ${res.statusText}`);
      }
      setSavedAt(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="h-screen">
      <Puck
        config={puckConfig}
        data={initialData ?? emptyPuckData}
        onPublish={handlePublish}
        headerTitle={`Editing: ${title}`}
        headerPath={`/p/${slug}`}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <div className="flex items-center gap-3 text-xs mr-2">
                {saving ? (
                  <span className="opacity-60">Saving…</span>
                ) : savedAt ? (
                  <span className="opacity-60">
                    Saved {savedAt.toLocaleTimeString()}
                  </span>
                ) : null}
                {error ? (
                  <span className="text-red-600">Error: {error}</span>
                ) : null}
              </div>
              {children}
            </>
          ),
        }}
      />
    </div>
  );
}
