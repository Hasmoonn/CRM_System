"use client";

import { motion } from "framer-motion";

const STATUS_STYLES = {
  New: { bg: "#eff6ff", color: "#1d4ed8", border: "#dbeafe", dot: "#3b82f6" },
  Contacted: {
    bg: "#fefce8",
    color: "#a16207",
    border: "#fef9c3",
    dot: "#eab308",
  },
  Qualified: {
    bg: "#f0fdf4",
    color: "#15803d",
    border: "#dcfce7",
    dot: "#22c55e",
  },
  "Proposal Sent": {
    bg: "#faf5ff",
    color: "#7e22ce",
    border: "#f3e8ff",
    dot: "#a855f7",
  },
  Won: { bg: "#ecfdf5", color: "#059669", border: "#d1fae5", dot: "#10b981" },
  Lost: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", dot: "#ef4444" },
};

export default function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES["New"];

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center"
      style={{
        gap: "6px",
        padding: "4px 12px",
        borderRadius: "100px",
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
        fontSize: "12px",
        fontWeight: 500,
        color: s.color,
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: s.dot,
        }}
      />
      {status}
    </motion.span>
  );
}
