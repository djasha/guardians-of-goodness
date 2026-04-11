"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useClient } from "sanity";
import { Cat, ClipboardList, Upload, Mail } from "lucide-react";

const PURPLE = "#9b4dca";
const TEAL = "#4ecdc4";
const CREAM = "#faf8f5";
const DARK = "#1a1a2e";

interface Stats {
  available: number;
  pending: number;
  newMessages: number;
}

export function DashboardTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [stats, setStats] = useState<Stats>({
    available: 0,
    pending: 0,
    newMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await client.fetch<Stats>(`{
          "available": count(*[_type == "cat" && adoptionStatus == "available"]),
          "pending": count(*[_type == "cat" && adoptionStatus == "pending"]),
          "newMessages": count(*[_type == "formSubmission" && status == "new"])
        }`);
        setStats(result);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [client]);

  return (
    <div style={{ padding: "1rem", maxWidth: 960, margin: "0 auto", fontFamily: '"Inter", system-ui, sans-serif', color: DARK }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.25rem", padding: "1.25rem", background: DARK, borderRadius: 10, border: `2px solid ${PURPLE}` }}>
        <Cat style={{ width: 28, height: 28, color: TEAL, margin: "0 auto 0.25rem" }} />
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: CREAM, margin: 0 }}>Guardians of Goodness</h1>
        <p style={{ color: TEAL, margin: "0.25rem 0 0", fontSize: "0.8rem" }}>Studio Dashboard</p>
      </div>

      {/* Welcome */}
      <p style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "1rem", textAlign: "center" }}>
        Welcome! This is your control center.
      </p>

      {/* Stats */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "0.85rem" }}>Loading...</p>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <StatCard label="Available" count={stats.available} color="#22c55e" bg="#d1fae5" />
          <StatCard label="Pending" count={stats.pending} color="#f59e0b" bg="#fef3c7" />
          <StatCard label="Messages" count={stats.newMessages} color="#ef4444" bg="#fee2e2" />
        </div>
      )}

      {/* Quick Actions */}
      <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9ca3af", marginBottom: "0.5rem" }}>Quick Actions</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <ActionRow icon={<Cat style={{ width: 18, height: 18 }} />} title="Manage Cats" desc="Add, edit, or update cat profiles." color={PURPLE} />
        <ActionRow icon={<ClipboardList style={{ width: 18, height: 18 }} />} title="Status Board" desc="Change status with one click." color={TEAL} />
        <ActionRow icon={<Upload style={{ width: 18, height: 18 }} />} title="Bulk Add" desc="Upload multiple photos at once." color="#ff8c42" />
        <ActionRow icon={<Mail style={{ width: 18, height: 18 }} />} title="Messages" desc="Review adoption inquiries." color="#ff6b6b" />
      </div>
    </div>
  );
}

function StatCard({ label, count, color, bg }: { label: string; count: number; color: string; bg: string }) {
  return (
    <div style={{ flex: 1, background: bg, borderRadius: 8, padding: "0.75rem 0.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: 800, color, lineHeight: 1 }}>{count}</div>
      <div style={{ fontSize: "0.65rem", fontWeight: 600, color, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "0.15rem" }}>{label}</div>
    </div>
  );
}

function ActionRow({ icon, title, desc, color }: { icon: ReactNode; title: string; desc: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", background: "#fff", borderRadius: 8, borderLeft: `3px solid ${color}` }}>
      <div style={{ color, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: DARK }}>{title}</div>
        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{desc}</div>
      </div>
    </div>
  );
}
