"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LEAD_STATUSES, LEAD_SOURCES } from "@/utils/constants";

export default function LeadForm({ initialData = {}, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    leadName: initialData.leadName || "",
    companyName: initialData.companyName || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    leadSource: initialData.leadSource || "Website",
    assignedSalesperson: initialData.assignedSalesperson || "",
    status: initialData.status || "New",
    estimatedDealValue: initialData.estimatedDealValue || "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      estimatedDealValue: Number(formData.estimatedDealValue) || 0,
    });
  };

  const getInputStyle = (fieldName) => ({
    width: "100%",
    padding: "clamp(10px, 2.5vw, 12px) clamp(11px, 2.5vw, 14px)",
    backgroundColor: "#ffffff",
    border: `2px solid ${focusedField === fieldName ? "#059669" : "#e2e8f0"}`,
    borderRadius: "8px",
    color: "#111827",
    fontSize: "clamp(13px, 2.5vw, 14px)",
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    outline: "none",
    transition: "all 0.2s ease",
    boxShadow:
      focusedField === fieldName ? "0 0 0 3px rgba(5,150,105,0.08)" : "none",
  });

  const labelStyle = {
    display: "block",
    fontSize: "clamp(11px, 2.3vw, 12px)",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "clamp(6px, 1.5vw, 8px)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "16px",
        padding: "clamp(20px, 5vw, 40px)",
        boxShadow:
          "0 4px 24px -4px rgba(0,0,0,0.06), 0 2px 12px -4px rgba(0,0,0,0.03)",
        border: "2px solid rgba(226, 232, 240, 0.7)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(16px, 5vw, 40px)",
          right: "clamp(16px, 5vw, 40px)",
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #059669, transparent)",
          opacity: 0.3,
        }}
      />

      <div style={{ marginBottom: "clamp(20px, 5vw, 32px)" }}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Noto Serif', Georgia, serif",
            fontSize: "clamp(22px, 5vw, 28px)",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "clamp(6px, 1.5vw, 8px)",
          }}
        >
          {initialData._id ? "Edit Lead" : "Create New Lead"}
        </motion.h2>
        <p style={{ fontSize: "clamp(13px, 2.5vw, 14px)", color: "#9ca3af" }}>
          {initialData._id
            ? "Update lead information"
            : "Fill in the details to add a new lead"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(clamp(200px, 45vw, 1fr), 1fr))",
          gap: "clamp(14px, 3vw, 24px)",
        }}
      >
        {/* Lead Name */}
        <div>
          <label style={labelStyle}>Lead Name *</label>
          <input
            type="text"
            name="leadName"
            value={formData.leadName}
            onChange={handleChange}
            onFocus={() => setFocusedField("leadName")}
            onBlur={() => setFocusedField(null)}
            placeholder="Enter lead name"
            required
            style={getInputStyle("leadName")}
          />
        </div>

        {/* Company Name */}
        <div>
          <label style={labelStyle}>Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            onFocus={() => setFocusedField("companyName")}
            onBlur={() => setFocusedField(null)}
            placeholder="Enter company name"
            required
            style={getInputStyle("companyName")}
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder="name@company.com"
            required
            style={getInputStyle("email")}
          />
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField(null)}
            placeholder="+1 (555) 000-0000"
            required
            style={getInputStyle("phone")}
          />
        </div>

        {/* Lead Source */}
        <div>
          <label style={labelStyle}>Lead Source</label>
          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            onFocus={() => setFocusedField("leadSource")}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle("leadSource")}
          >
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Assigned Salesperson */}
        <div>
          <label style={labelStyle}>Assigned Salesperson *</label>
          <input
            type="text"
            name="assignedSalesperson"
            value={formData.assignedSalesperson}
            onChange={handleChange}
            onFocus={() => setFocusedField("assignedSalesperson")}
            onBlur={() => setFocusedField(null)}
            placeholder="Salesperson name"
            required
            style={getInputStyle("assignedSalesperson")}
          />
        </div>

        {/* Status */}
        <div>
          <label style={labelStyle}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            onFocus={() => setFocusedField("status")}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle("status")}
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Deal Value */}
        <div>
          <label style={labelStyle}>Estimated Deal Value ($)</label>
          <input
            type="number"
            name="estimatedDealValue"
            value={formData.estimatedDealValue}
            onChange={handleChange}
            onFocus={() => setFocusedField("estimatedDealValue")}
            onBlur={() => setFocusedField(null)}
            placeholder="0"
            min="0"
            style={getInputStyle("estimatedDealValue")}
          />
        </div>

        {/* Submit Button */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            gap: "clamp(8px, 2vw, 12px)",
            justifyContent: "flex-end",
            paddingTop: "clamp(12px, 2.5vw, 16px)",
            flexWrap: "wrap",
          }}
        >
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.005 }}
            whileTap={{ scale: loading ? 1 : 0.995 }}
            type="submit"
            disabled={loading}
            style={{
              padding: "clamp(12px, 2.5vw, 14px) clamp(20px, 5vw, 32px)",
              borderRadius: "8px",
              border: "none",
              backgroundColor: loading ? "#d1fae5" : "#059669",
              color: loading ? "#6b7280" : "#ffffff",
              fontSize: "clamp(12px, 2.5vw, 13px)",
              fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: loading ? "none" : "0 4px 14px rgba(5,150,105,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(6px, 1.5vw, 8px)",
              minHeight: "44px",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#047857";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(5,150,105,0.25)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#059669";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(5,150,105,0.2)";
              }
            }}
          >
            {loading ? (
              <>
                <motion.div
                  style={{
                    width: "clamp(14px, 3vw, 16px)",
                    height: "clamp(14px, 3vw, 16px)",
                    border: "2px solid #d1fae5",
                    borderTopColor: "#059669",
                    borderRadius: "50%",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Saving...
              </>
            ) : (
              <>
                <svg
                  style={{
                    width: "clamp(14px, 3vw, 16px)",
                    height: "clamp(14px, 3vw, 16px)",
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                {initialData._id ? "Update Lead" : "Create Lead"}
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
