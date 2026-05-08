"use client";

import { motion } from "framer-motion";
import { HiSearch, HiFilter, HiX } from "react-icons/hi";
import { LEAD_STATUSES, LEAD_SOURCES } from "@/utils/constants";

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      leadSource: "",
      assignedSalesperson: "",
      search: "",
    });
  };

  const hasFilters =
    filters.status ||
    filters.leadSource ||
    filters.assignedSalesperson ||
    filters.search;

  const getInputStyle = {
    width: "100%",
    padding: "clamp(10px, 2.5vw, 11px) clamp(11px, 2.5vw, 14px)",
    backgroundColor: "#ffffff",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    color: "#111827",
    fontSize: "clamp(12px, 2.5vw, 13px)",
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "12px",
        padding: "clamp(12px, 3vw, 18px)",
        marginBottom: "clamp(12px, 3vw, 20px)",
        border: "2px solid rgba(226, 232, 240, 0.7)",
        boxShadow:
          "0 4px 24px -4px rgba(0,0,0,0.06), 0 2px 12px -4px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px, 2vw, 12px)",
          marginBottom: "clamp(10px, 2.5vw, 14px)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <HiFilter
            style={{
              width: "clamp(14px, 3vw, 16px)",
              height: "clamp(14px, 3vw, 16px)",
              color: "#059669",
            }}
          />
          <span
            style={{
              fontSize: "clamp(11px, 2.5vw, 12px)",
              fontWeight: 700,
              color: "#111827",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Filters & Search
          </span>
        </div>
        {hasFilters && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={clearFilters}
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "clamp(10px, 2.2vw, 11px)",
              color: "#dc2626",
              fontWeight: 600,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#991b1b")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#dc2626")}
          >
            <HiX style={{ width: "14px", height: "14px" }} />
            Clear All
          </motion.button>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(clamp(140px, 30vw, 180px), 1fr))",
          gap: "clamp(8px, 2vw, 12px)",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", gridColumn: "auto" }}>
          <HiSearch
            style={{
              position: "absolute",
              left: "clamp(10px, 2vw, 12px)",
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(14px, 3vw, 16px)",
              height: "clamp(14px, 3vw, 16px)",
              color: "#9ca3af",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search leads..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
            style={{ ...getInputStyle, paddingLeft: "clamp(32px, 8vw, 40px)" }}
          />
        </div>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          style={getInputStyle}
        >
          <option value="">All Statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Source Filter */}
        <select
          value={filters.leadSource}
          onChange={(e) => handleChange("leadSource", e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          style={getInputStyle}
        >
          <option value="">All Sources</option>
          {LEAD_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Salesperson Filter */}
        <input
          type="text"
          placeholder="Salesperson..."
          value={filters.assignedSalesperson}
          onChange={(e) => handleChange("assignedSalesperson", e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          style={getInputStyle}
        />
      </div>
    </motion.div>
  );
}
