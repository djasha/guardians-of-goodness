"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { puckConfig, emptyPuckData, type PuckData } from "@/puck/config";

type Props = {
  pageId: string;
  publicPath: string;
  title: string;
  initialData: PuckData | null;
  initialHasDraft: boolean;
};

type Status = "idle" | "saving" | "publishing" | "error";

export function EditorClient({
  pageId,
  publicPath,
  title,
  initialData,
  initialHasDraft,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [lastPublishedAt, setLastPublishedAt] = useState<Date | null>(null);
  const [hasDraft, setHasDraft] = useState<boolean>(initialHasDraft);
  const [error, setError] = useState<string | null>(null);
  const pendingData = useRef<PuckData | null>(null);
  const pendingSerializedData = useRef<string | null>(null);
  const lastPersistedData = useRef(serializePuckData(initialData ?? emptyPuckData));
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingDraftSave = useCallback(() => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    pendingData.current = null;
    pendingSerializedData.current = null;
  }, []);

  const save = useCallback(
    async (data: PuckData, mode: "draft" | "publish") => {
      if (mode === "publish") {
        clearPendingDraftSave();
      }
      setStatus(mode === "draft" ? "saving" : "publishing");
      setError(null);
      try {
        const url = mode === "draft"
          ? `/api/puck/${encodeURIComponent(pageId)}?draft=1`
          : `/api/puck/${encodeURIComponent(pageId)}`;
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
          lastPersistedData.current = serializePuckData(data);
          setLastSavedAt(new Date());
          setHasDraft(true);
        } else {
          lastPersistedData.current = serializePuckData(data);
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
    [clearPendingDraftSave, pageId]
  );

  const scheduleDraftSave = useCallback(
    (data: PuckData) => {
      const serialized = serializePuckData(data);
      if (
        serialized === lastPersistedData.current ||
        serialized === pendingSerializedData.current
      ) {
        return;
      }
      pendingData.current = data;
      pendingSerializedData.current = serialized;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        const current = pendingData.current;
        saveTimer.current = null;
        pendingData.current = null;
        pendingSerializedData.current = null;
        if (current) save(current, "draft");
      }, 1200);
    },
    [save]
  );

  useEffect(() => {
    return clearPendingDraftSave;
  }, [clearPendingDraftSave]);

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
        headerPath={publicPath}
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

function serializePuckData(data: PuckData): string {
  return JSON.stringify(sortPuckValue(data));
}

function sortPuckValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortPuckValue);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return Object.keys(value)
      .sort()
      .reduce<Record<string, unknown>>((sorted, key) => {
        if (key.startsWith("_")) {
          return sorted;
        }
        const normalized = normalizePuckValue(key, record[key]);
        if (typeof normalized !== "undefined") {
          sorted[key] = sortPuckValue(normalized);
        }
        return sorted;
      }, {});
  }

  return value;
}

function normalizePuckValue(key: string, value: unknown): unknown {
  if (key === "overlay" && (value === "true" || value === "false")) {
    return value === "true";
  }

  if (
    key === "zones" &&
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  ) {
    return undefined;
  }

  return value;
}
