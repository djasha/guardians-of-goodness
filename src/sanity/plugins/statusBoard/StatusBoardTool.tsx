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
    <div
      style={{
        padding: "2rem",
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: DARK,
      }}
    >
      {/* Error banner */}
      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "2px solid #fca5a5",
            borderRadius: 8,
            padding: "0.75rem 1rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#991b1b",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {error}
          <button
            onClick={() => setError(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#991b1b", fontWeight: 800, fontSize: "1rem" }}
          >
            &times;
          </button>
        </div>
      )}

      {/* Header */}
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          marginBottom: "1.5rem",
          color: DARK,
        }}
      >
        <ClipboardList style={{ width: 24, height: 24, display: "inline-block", verticalAlign: "middle", marginRight: 8 }} />{" "}
        Quick Status Board
      </h1>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#6b7280",
          marginTop: "-0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        Click any cat's status to change it. Available → Pending → Adopted → Available.
      </p>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 8,
              border: `2px solid ${filter === opt.value ? PURPLE : "#e5e7eb"}`,
              background: filter === opt.value ? PURPLE : "#fff",
              color: filter === opt.value ? "#fff" : DARK,
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {opt.label}
          </button>
        ))}

        <input
          type="text"
          placeholder="Search by name..."
          title="Type a cat's name to find them quickly"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: "2px solid #e5e7eb",
            fontSize: "0.85rem",
            marginLeft: "auto",
            minWidth: 200,
            outline: "none",
          }}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Loading cats...
        </p>
      ) : filteredCats.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No cats found.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
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
                    height: 140,
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
                <div style={{ padding: "0.75rem" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      marginBottom: "0.5rem",
                      color: DARK,
                    }}
                  >
                    {cat.name || "Unnamed"}
                  </div>
                  <button
                    onClick={() =>
                      handleStatusChange(cat._id, cat.adoptionStatus)
                    }
                    disabled={isUpdating}
                    style={{
                      display: "inline-block",
                      padding: "0.3rem 0.75rem",
                      borderRadius: 20,
                      background: statusColor.bg,
                      color: statusColor.text,
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      border: "none",
                      cursor: isUpdating ? "wait" : "pointer",
                      opacity: isUpdating ? 0.6 : 1,
                      transition: "opacity 0.15s",
                    }}
                    title={`Click to change to "${nextStatus(cat.adoptionStatus)}"`}
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
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: CREAM,
          borderRadius: 8,
          fontSize: "0.8rem",
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        <strong>How it works:</strong> Click the colored status button on any cat to cycle
        through <strong>Available</strong> → <strong>Pending</strong> →{" "}
        <strong>Adopted</strong>. Changes save automatically.
      </div>
    </div>
  );
}
