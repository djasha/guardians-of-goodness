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
        const result = await client.fetch<{
          available: number;
          pending: number;
          newMessages: number;
        }>(`{
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
    <div
      style={{
        padding: "2rem",
        maxWidth: 960,
        margin: "0 auto",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: DARK,
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          padding: "2rem",
          background: DARK,
          borderRadius: 12,
          border: `3px solid ${PURPLE}`,
        }}
      >
        <div style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "center" }}>
          <Cat style={{ width: 40, height: 40, color: TEAL }} />
        </div>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: CREAM,
            margin: 0,
          }}
        >
          Guardians of Goodness
        </h1>
        <p style={{ color: TEAL, margin: "0.5rem 0 0", fontSize: "0.95rem" }}>
          Studio Dashboard
        </p>
      </div>

      {/* Stats Row */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Loading stats...
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <StatCard
            label="Available Cats"
            count={stats.available}
            bg="#d1fae5"
            accent="#065f46"
            icon={<div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22c55e" }} />}
          />
          <StatCard
            label="Pending Cats"
            count={stats.pending}
            bg="#fef3c7"
            accent="#92400e"
            icon={<div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f59e0b" }} />}
          />
          <StatCard
            label="New Messages"
            count={stats.newMessages}
            bg="#fee2e2"
            accent="#991b1b"
            icon={<div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />}
          />
        </div>
      )}

      {/* Action Cards */}
      <h2
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          marginBottom: "1rem",
          color: DARK,
        }}
      >
        Quick Actions
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        <ActionCard
          icon={<Cat style={{ width: 24, height: 24, color: PURPLE }} />}
          title="Manage Cats"
          description='Go to the Content tab and select "Cats" to add, edit, or update cat profiles and their adoption status.'
          color={PURPLE}
        />
        <ActionCard
          icon={<ClipboardList style={{ width: 24, height: 24, color: TEAL }} />}
          title="Quick Status Board"
          description='Switch to the "Status Board" tool in the top nav to quickly change cat statuses with one click.'
          color={TEAL}
        />
        <ActionCard
          icon={<Upload style={{ width: 24, height: 24, color: "#ff8c42" }} />}
          title="Bulk Add Cats"
          description='Switch to the "Bulk Add" tool in the top nav to upload multiple cat photos and create profiles at once.'
          color="#ff8c42"
        />
        <ActionCard
          icon={<Mail style={{ width: 24, height: 24, color: "#ff6b6b" }} />}
          title="Check Messages"
          description='Go to the Content tab and select "Form Submissions" to review and respond to new inquiries.'
          color="#ff6b6b"
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  count,
  bg,
  accent,
  icon,
}: {
  label: string;
  count: number;
  bg: string;
  accent: string;
  icon: ReactNode;
}) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 10,
        padding: "1.25rem",
        textAlign: "center",
        border: `2px solid ${accent}22`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.25rem" }}>{icon}</div>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          color: accent,
          lineHeight: 1,
        }}
      >
        {count}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: accent,
          marginTop: "0.25rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  color,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: "1.25rem",
        borderLeft: `4px solid ${color}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ marginBottom: "0.5rem" }}>{icon}</div>
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          margin: "0 0 0.5rem",
          color: DARK,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.85rem",
          color: "#6b7280",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
}
