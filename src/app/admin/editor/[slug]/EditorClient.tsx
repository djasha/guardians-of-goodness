"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig, emptyPuckData, type PuckData } from "@/puck/config";

type Props = {
  slug: string;
  title: string;
  initialData: PuckData | null;
  initialHasDraft: boolean;
};

type Status = "idle" | "saving" | "publishing" | "error";

export function EditorClient({ slug, title, initialData, initialHasDraft }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [lastPublishedAt, setLastPublishedAt] = useState<Date | null>(null);
  const [hasDraft, setHasDraft] = useState<boolean>(initialHasDraft);
  const [error, setError] = useState<string | null>(null);
  const pendingData = useRef<PuckData | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    async (data: PuckData, mode: "draft" | "publish") => {
      setStatus(mode === "draft" ? "saving" : "publishing");
      setError(null);
      try {
        const url = mode === "draft"
          ? `/api/puck/${slug}?draft=1`
          : `/api/puck/${slug}`;
        const res = await fetch(url, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ puckData: data }),
        });
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || `${res.status} ${res.statusText}`);
        }
        if (mode === "draft") {
          setLastSavedAt(new Date());
          setHasDraft(true);
        } else {
          setLastPublishedAt(new Date());
          setHasDraft(false);
          setLastSavedAt(null);
        }
        setStatus("idle");
      } catch (e) {
        setStatus("error");
        setError(e instanceof Error ? e.message : "Save failed");
      }
    },
    [slug]
  );

  const scheduleDraftSave = useCallback(
    (data: PuckData) => {
      pendingData.current = data;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        const current = pendingData.current;
        if (current) save(current, "draft");
      }, 1200);
    },
    [save]
  );

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  function statusText(): string {
    if (error) return `Error: ${error}`;
    if (status === "saving") return "Saving draft…";
    if (status === "publishing") return "Publishing…";
    if (lastPublishedAt)
      return `Published ${lastPublishedAt.toLocaleTimeString()}`;
    if (lastSavedAt)
      return `Draft saved ${lastSavedAt.toLocaleTimeString()}`;
    if (hasDraft) return "Unpublished draft";
    return "";
  }

  return (
    <div className="h-screen">
      <Puck
        config={puckConfig}
        data={initialData ?? emptyPuckData}
        onChange={scheduleDraftSave}
        onPublish={(data) => save(data, "publish")}
        headerTitle={`Editing: ${title}`}
        headerPath={`/${slug}`}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <div className="flex items-center gap-3 text-xs mr-2">
                <span
                  className={
                    error
                      ? "text-red-600"
                      : hasDraft && status === "idle"
                        ? "text-amber-600"
                        : "opacity-60"
                  }
                >
                  {statusText()}
                </span>
              </div>
              {children}
            </>
          ),
        }}
      />
    </div>
  );
}
