"use client";

import { useState, useRef } from "react";
import { useClient } from "sanity";

const PURPLE = "#9b4dca";
const TEAL = "#4ecdc4";
const CREAM = "#faf8f5";
const DARK = "#1a1e2e";

interface CatRow {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  gender: "male" | "female";
  ageCategory: "kitten" | "young" | "adult" | "senior";
}

export function BulkAddTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<CatRow[]>([]);
  const [creating, setCreating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [result, setResult] = useState<{
    success: number;
    failed: number;
  } | null>(null);

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newRows: CatRow[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "),
      gender: "female" as const,
      ageCategory: "adult" as const,
    }));

    setRows((prev) => [...prev, ...newRows]);
    setResult(null);

    // Reset file input so the same files can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function updateRow(id: string, updates: Partial<CatRow>) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...updates } : row))
    );
  }

  function removeRow(id: string) {
    setRows((prev) => {
      const row = prev.find((r) => r.id === id);
      if (row) URL.revokeObjectURL(row.previewUrl);
      return prev.filter((r) => r.id !== id);
    });
  }

  async function handleCreateAll() {
    if (rows.length === 0) return;
    setCreating(true);
    setProgress({ current: 0, total: rows.length });
    setResult(null);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        // Upload image
        const imageAsset = await client.assets.upload("image", row.file);

        // Create cat document
        await client.create({
          _type: "cat",
          name: row.name,
          gender: row.gender,
          ageCategory: row.ageCategory,
          photos: [
            {
              _type: "image",
              _key: `photo-${Date.now()}`,
              asset: {
                _type: "reference",
                _ref: imageAsset._id,
              },
            },
          ],
          adoptionStatus: "available",
          visible: true,
          featured: false,
        });

        success++;
      } catch (err) {
        console.error(`Failed to create cat "${row.name}":`, err);
        failed++;
      }

      setProgress({ current: i + 1, total: rows.length });
    }

    setResult({ success, failed });
    setCreating(false);

    // Clear rows on full success
    if (failed === 0) {
      rows.forEach((r) => URL.revokeObjectURL(r.previewUrl));
      setRows([]);
    }
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: 900,
        margin: "0 auto",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: DARK,
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          marginBottom: "0.5rem",
          color: DARK,
        }}
      >
        📦 Bulk Add Cats
      </h1>
      <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        Upload multiple photos to create cat profiles quickly.
      </p>

      {/* File Input */}
      <div
        style={{
          padding: "2rem",
          border: `3px dashed ${PURPLE}`,
          borderRadius: 12,
          textAlign: "center",
          background: CREAM,
          marginBottom: "1.5rem",
          cursor: "pointer",
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📸</div>
        <p style={{ fontWeight: 600, color: DARK, margin: "0 0 0.25rem" }}>
          Click to select photos
        </p>
        <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0 }}>
          Select multiple images at once
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelected}
          style={{ display: "none" }}
        />
      </div>

      {/* Rows */}
      {rows.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: DARK,
            }}
          >
            {rows.length} cat{rows.length !== 1 ? "s" : ""} to add
          </h2>

          {rows.map((row) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem",
                marginBottom: "0.75rem",
                background: "#fff",
                borderRadius: 10,
                border: "2px solid #e5e7eb",
              }}
            >
              {/* Preview */}
              <img
                src={row.previewUrl}
                alt="Preview"
                style={{
                  width: 64,
                  height: 64,
                  objectFit: "cover",
                  borderRadius: 8,
                  flexShrink: 0,
                }}
              />

              {/* Name */}
              <input
                type="text"
                value={row.name}
                onChange={(e) => updateRow(row.id, { name: e.target.value })}
                placeholder="Cat name"
                disabled={creating}
                style={{
                  flex: 1,
                  padding: "0.4rem 0.6rem",
                  borderRadius: 6,
                  border: "2px solid #e5e7eb",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  minWidth: 100,
                  outline: "none",
                }}
              />

              {/* Gender */}
              <select
                value={row.gender}
                onChange={(e) =>
                  updateRow(row.id, {
                    gender: e.target.value as "male" | "female",
                  })
                }
                disabled={creating}
                style={{
                  padding: "0.4rem 0.6rem",
                  borderRadius: 6,
                  border: "2px solid #e5e7eb",
                  fontSize: "0.85rem",
                  outline: "none",
                  background: "#fff",
                }}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>

              {/* Age */}
              <select
                value={row.ageCategory}
                onChange={(e) =>
                  updateRow(row.id, {
                    ageCategory: e.target.value as CatRow["ageCategory"],
                  })
                }
                disabled={creating}
                style={{
                  padding: "0.4rem 0.6rem",
                  borderRadius: 6,
                  border: "2px solid #e5e7eb",
                  fontSize: "0.85rem",
                  outline: "none",
                  background: "#fff",
                }}
              >
                <option value="kitten">Kitten</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>

              {/* Remove */}
              <button
                onClick={() => removeRow(row.id)}
                disabled={creating}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: creating ? "not-allowed" : "pointer",
                  opacity: creating ? 0.3 : 0.6,
                  padding: "0.25rem",
                  flexShrink: 0,
                }}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Progress */}
      {creating && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            background: CREAM,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: PURPLE,
              marginBottom: "0.5rem",
            }}
          >
            Creating {progress.current} of {progress.total}...
          </div>
          <div
            style={{
              width: "100%",
              height: 8,
              background: "#e5e7eb",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%`,
                height: "100%",
                background: TEAL,
                borderRadius: 4,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            background: result.failed === 0 ? "#d1fae5" : "#fef3c7",
            borderRadius: 8,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {result.failed === 0
            ? `Successfully created ${result.success} cat${result.success !== 1 ? "s" : ""}!`
            : `Created ${result.success}, failed ${result.failed}. Check the console for errors.`}
        </div>
      )}

      {/* Create Button */}
      {rows.length > 0 && !creating && (
        <button
          onClick={handleCreateAll}
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: 10,
            border: "none",
            background: PURPLE,
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: `0 4px 0 0 ${DARK}`,
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 2px 0 0 ${DARK}`;
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "none";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 0 0 ${DARK}`;
          }}
        >
          Create All Cats ({rows.length})
        </button>
      )}
    </div>
  );
}
