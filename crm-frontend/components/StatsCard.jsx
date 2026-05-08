"use client";

import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon, color, delay = 0 }) {
  const colorMap = {
    blue: {
      bg: "#eff6ff",
      border: "#dbeafe",
      icon: "#3b82f6",
      accent: "rgba(59,130,246,0.08)",
    },
    green: {
      bg: "#f0fdf4",
      border: "#dcfce7",
      icon: "#059669",
      accent: "rgba(5,150,105,0.08)",
    },
    purple: {
      bg: "#faf5ff",
      border: "#f3e8ff",
      icon: "#7c3aed",
      accent: "rgba(124,58,237,0.08)",
    },
    amber: {
      bg: "#fffbeb",
      border: "#fef3c7",
      icon: "#d97706",
      accent: "rgba(217,119,6,0.08)",
    },
    red: {
      bg: "#fef2f2",
      border: "#fecaca",
      icon: "#dc2626",
      accent: "rgba(220,38,38,0.08)",
    },
    cyan: {
      bg: "#ecfeff",
      border: "#cffafe",
      icon: "#0891b2",
      accent: "rgba(8,145,178,0.08)",
    },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "22px 20px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 25px -5px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Accent corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60px",
          height: "60px",
          borderRadius: "0 12px 0 60px",
          backgroundColor: c.accent,
        }}
      />

      <div className="flex items-start justify-between relative">
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#9ca3af",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {title}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            style={{
              fontSize: title === "Total Value" ? "20px" : "28px",
              fontWeight: 700,
              color: "#111827",
              fontFamily: "'Noto Serif', Georgia, serif",
              lineHeight: 1,
            }}
          >
            {value}
          </motion.p>
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            backgroundColor: c.bg,
            border: `1px solid ${c.border}`,
            color: c.icon,
            fontSize: "20px",
          }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
