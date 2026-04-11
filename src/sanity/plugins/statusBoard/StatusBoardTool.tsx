"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useClient } from "sanity";
import { ClipboardList, Cat } from "lucide-react";

const PURPLE = "#9b4dca";
const TEAL = "#4ecdc4";
const CREAM = "#faf8f5";
const DARK = "#1a1a2e";

type AdoptionStatus = "available" | "pending" | "adopted";

interface CatEntry {
  _id: string;
  name: string;
  adoptionStatus: AdoptionStatus;
  photoUrl: string | null;
}

const STATUS_COLORS: Record<AdoptionStatus, { bg: string; text: string }> = {
  available: { bg: "#d1fae5", text: "#065f46" },
  pending: { bg: "#fef3c7", text: "#92400e" },
  adopted: { bg: "#ede9fe", text: "#5b21b6" },
};

const STATUS_ORDER: AdoptionStatus[] = ["available", "pending", "adopted"];
const FILTER_OPTIONS: Array<{ label: string; value: AdoptionStatus | "all" }> =
  [
    { label: "All", value: "all" },
    { label: "Available", value: "available" },
    { label: "Pending", value: "pending" },
    { label: "Adopted", value: "adopted" },
  ];

function nextStatus(current: AdoptionStatus): AdoptionStatus {
  const idx = STATUS_ORDER.indexOf(current);
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
}

export function StatusBoardTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [cats, setCats] = useState<CatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AdoptionStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCats() {
      try {
        const result = await client.fetch<CatEntry[]>(
          `*[_type == "cat"] | order(name asc) {
            _id,
            name,
            adoptionStatus,
            "photoUrl": photos[0].asset->url
          }`
        );
        setCats(result);
      } catch (err) {
        console.error("Failed to fetch cats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCats();
  }, [client]);

  // Use a ref for the cat name lookup to avoid stale closure in useCallback
  const catsRef = useRef(cats);
  catsRef.current = cats;

  const handleStatusChange = useCallback(
    async (catId: string, currentStatus: AdoptionStatus) => {
      const newStatus = nextStatus(currentStatus);
      const catName = catsRef.current.find(c => c._id === catId)?.name || "cat";

      // Optimistic update
      setCats((prev) =>
        prev.map((c) =>
          c._id === catId ? { ...c, adoptionStatus: newStatus } : c
        )
      );
      setUpdating((prev) => new Set(prev).add(catId));

      try {
        await client
          .patch(catId)
          .set({ adoptionStatus: newStatus })
          .commit();
      } catch (err) {
        console.error("Failed to update status:", err);
        setError(`Failed to update ${catName}'s status. Please try again.`);
        // Revert on error
        setCats((prev) =>
          prev.map((c) =>
            c._id === catId ? { ...c, adoptionStatus: currentStatus } : c
          )
        );
      } finally {
        setUpdating((prev) => {
          const next = new Set(prev);
          next.delete(catId);
          return next;
        });
      }
    },
    [client]
  );

  const filteredCats = cats.filter((cat) => {
    if (filter !== "all" && cat.adoptionStatus !== filter) return false;
    if (search && !cat.name?.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div style={{ padding: "1rem", maxWidth: 1100, margin: "0 auto", fontFamily: '"Inter", system-ui, sans-serif', color: DARK }}>
      {/* Error banner */}
      {error && (
        <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: 8, padding: "0.5rem 0.75rem", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#991b1b", fontSize: "0.8rem", fontWeight: 600 }}>
          {error}
          <button onClick={() => setError(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#991b1b", fontWeight: 800, fontSize: "1rem", padding: "0.25rem" }}>&times;</button>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "0.75rem" }}>
        <h1 style={{ fontSize: "1.1rem", fontWeight: 800, color: DARK, margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <ClipboardList style={{ width: 18, height: 18 }} /> Status Board
        </h1>
        <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: "0.25rem 0 0" }}>Tap a status to change it. Saves automatically.</p>
      </div>

      {/* Filters + Search */}
      <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            style={{ padding: "0.35rem 0.65rem", borderRadius: 6, border: `2px solid ${filter === opt.value ? PURPLE : "#e5e7eb"}`, background: filter === opt.value ? PURPLE : "#fff", color: filter === opt.value ? "#fff" : DARK, fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}
          >
            {opt.label}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search..."
          title="Type a cat's name to find them quickly"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.35rem 0.65rem", borderRadius: 6, border: "2px solid #e5e7eb", fontSize: "0.75rem", flex: "1 1 120px", minWidth: 0, outline: "none" }}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "0.85rem" }}>Loading...</p>
      ) : filteredCats.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "0.85rem" }}>No cats found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.5rem" }}>
          {filteredCats.map((cat) => {
            const statusColor = STATUS_COLORS[cat.adoptionStatus];
            const isUpdating = updating.has(cat._id);
            return (
              <div
                key={cat._id}
                style={{
                  background: "#fff",
                  borderRadius: 10,
                  border: "2px solid #e5e7eb",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                {/* Photo */}
                <div
                  style={{
                    width: "100%",
                    height: 100,
                    background: CREAM,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {cat.photoUrl ? (
                    <img
                      src={`${cat.photoUrl}?w=300&h=200&fit=crop`}
                      alt={cat.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Cat style={{ width: 40, height: 40, color: "#9b4dca" }} />
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "0.5rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.8rem", marginBottom: "0.25rem", color: DARK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {cat.name || "Unnamed"}
                  </div>
                  <button
                    onClick={() => handleStatusChange(cat._id, cat.adoptionStatus)}
                    disabled={isUpdating}
                    style={{ display: "inline-block", padding: "0.2rem 0.5rem", borderRadius: 12, background: statusColor.bg, color: statusColor.text, fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.04em", border: "none", cursor: isUpdating ? "wait" : "pointer", opacity: isUpdating ? 0.6 : 1 }}
                    title={`Tap to change to "${nextStatus(cat.adoptionStatus)}"`}
                  >
                    {cat.adoptionStatus}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div style={{ marginTop: "1rem", padding: "0.5rem 0.75rem", background: CREAM, borderRadius: 6, fontSize: "0.7rem", color: "#6b7280", textAlign: "center" }}>
        Tap status to cycle: <strong>Available → Pending → Adopted</strong>. Auto-saves.
      </div>
    </div>
  );
}
