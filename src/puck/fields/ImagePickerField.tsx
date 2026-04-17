"use client";

import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  id: string;
};

export function ImagePickerField({ value, onChange, id }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

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
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Upload failed");
    }
  }

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
  );
}
