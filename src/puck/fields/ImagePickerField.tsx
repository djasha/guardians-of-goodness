"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  id: string;
};

type Asset = {
  _id: string;
  url: string;
  originalFilename?: string;
  metadata?: { dimensions?: { width?: number; height?: number } };
};

type Tab = "upload" | "library";

export function ImagePickerField({ value, onChange, id }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("upload");
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setStatus("uploading");
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/puck/upload", { method: "POST", body: form });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `${res.status} ${res.statusText}`);
      }
      const { url } = (await res.json()) as { url: string };
      onChange(url);
      setStatus("idle");
      // Invalidate library so the next open sees the new upload
      setAssets(null);
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Upload failed");
    }
  }

  useEffect(() => {
    if (tab !== "library" || assets) return;
    let cancelled = false;
    setLibraryLoading(true);
    setLibraryError(null);
    fetch("/api/puck/assets?limit=30")
      .then(async (r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json() as Promise<{ assets: Asset[] }>;
      })
      .then(({ assets }) => {
        if (!cancelled) setAssets(assets);
      })
      .catch((e) => {
        if (!cancelled) {
          setLibraryError(e instanceof Error ? e.message : "Failed to load");
        }
      })
      .finally(() => {
        if (!cancelled) setLibraryLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, assets]);

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            border: "1px solid #ccc",
            borderRadius: 4,
            background: "#f3f3f3",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            aspectRatio: "16 / 9",
            border: "1px dashed #ccc",
            borderRadius: 4,
            color: "#888",
            fontSize: 13,
            background: "#fafafa",
          }}
        >
          No image selected
        </div>
      )}

      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #e5e5e5", marginTop: 4 }}>
        <TabButton active={tab === "upload"} onClick={() => setTab("upload")}>
          Upload
        </TabButton>
        <TabButton active={tab === "library"} onClick={() => setTab("library")}>
          Library
        </TabButton>
      </div>

      {tab === "upload" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={status === "uploading"}
              style={{
                flex: 1,
                padding: "8px 12px",
                fontSize: 13,
                fontWeight: 500,
                background: "#1a1a2e",
                color: "#fff",
                border: "1px solid #1a1a2e",
                borderRadius: 4,
                cursor: status === "uploading" ? "wait" : "pointer",
                opacity: status === "uploading" ? 0.6 : 1,
              }}
            >
              {status === "uploading" ? "Uploading…" : value ? "Replace image" : "Upload image"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => onChange("")}
                style={{
                  padding: "8px 12px",
                  fontSize: 13,
                  background: "transparent",
                  color: "#c00",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            ) : null}
          </div>
          {error ? (
            <div style={{ fontSize: 12, color: "#c00" }}>Error: {error}</div>
          ) : null}
          <div style={{ fontSize: 11, color: "#888" }}>
            JPG, PNG, WebP, GIF or AVIF. Max 5MB. Uploaded to Sanity.
          </div>
        </div>
      ) : (
        <div>
          {libraryLoading ? (
            <div style={{ padding: 12, fontSize: 12, color: "#888" }}>Loading…</div>
          ) : libraryError ? (
            <div style={{ padding: 12, fontSize: 12, color: "#c00" }}>
              Error: {libraryError}
            </div>
          ) : !assets || assets.length === 0 ? (
            <div style={{ padding: 12, fontSize: 12, color: "#888" }}>
              No images uploaded yet. Switch to Upload to add one.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 6,
                maxHeight: 300,
                overflowY: "auto",
                paddingTop: 4,
              }}
            >
              {assets.map((asset) => {
                const isSelected = asset.url === value;
                return (
                  <button
                    key={asset._id}
                    type="button"
                    onClick={() => onChange(asset.url)}
                    title={asset.originalFilename || asset._id}
                    style={{
                      position: "relative",
                      aspectRatio: "1 / 1",
                      padding: 0,
                      background: "#f3f3f3",
                      border: isSelected ? "2px solid #9b4dca" : "1px solid #ccc",
                      borderRadius: 4,
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${asset.url}?w=160&h=160&fit=crop&auto=format`}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 600,
        background: "transparent",
        color: active ? "#1a1a2e" : "#888",
        border: "none",
        borderBottom: active ? "2px solid #9b4dca" : "2px solid transparent",
        cursor: "pointer",
        marginBottom: -1,
      }}
    >
      {children}
    </button>
  );
}
