"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi";

export default function LeadTable({ leads, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "2px solid rgba(226, 232, 240, 0.7)",
        boxShadow:
          "0 4px 24px -4px rgba(0,0,0,0.06), 0 2px 12px -4px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr
              style={{
                borderBottom: "2px solid rgba(226, 232, 240, 0.7)",
                backgroundColor: "rgba(5, 150, 105, 0.02)",
              }}
            >
              {[
                "Lead",
                "Company",
                "Status",
                "Value",
                "Salesperson",
                "Source",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#059669",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {header}
                </th>
              ))}
              <th
                style={{
                  padding: "16px 20px",
                  textAlign: "right",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#059669",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <motion.tr
                key={lead._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                style={{
                  borderBottom: "1px solid rgba(226, 232, 240, 0.5)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(5, 150, 105, 0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {/* Lead Name + Email */}
                <td style={{ padding: "16px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background:
                          "linear-gradient(135deg, rgba(5, 150, 105, 0.15), rgba(124, 58, 237, 0.15))",
                        border: "1.5px solid rgba(5, 150, 105, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#059669",
                        }}
                      >
                        {lead.leadName?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#111827",
                          marginBottom: "2px",
                        }}
                      >
                        {lead.leadName}
                      </p>
                      <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                        {lead.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Company */}
                <td
                  style={{
                    padding: "16px 20px",
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  {lead.companyName}
                </td>

                {/* Status */}
                <td style={{ padding: "16px 20px" }}>
                  <StatusBadge status={lead.status} />
                </td>

                {/* Value */}
                <td
                  style={{
                    padding: "16px 20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#059669",
                  }}
                >
                  {lead.estimatedDealValue?.toLocaleString() || 0}
                </td>

                {/* Salesperson */}
                <td
                  style={{
                    padding: "16px 20px",
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  {lead.assignedSalesperson}
                </td>

                {/* Source */}
                <td
                  style={{
                    padding: "16px 20px",
                    fontSize: "13px",
                    color: "#9ca3af",
                  }}
                >
                  {lead.leadSource}
                </td>

                {/* Actions */}
                <td style={{ padding: "16px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "8px",
                    }}
                  >
                    <Link href={`/leads/${lead._id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          padding: "8px 10px",
                          borderRadius: "6px",
                          backgroundColor: "rgba(5, 150, 105, 0.1)",
                          border: "1px solid rgba(5, 150, 105, 0.2)",
                          color: "#059669",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(5, 150, 105, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(5, 150, 105, 0.1)";
                        }}
                      >
                        <HiEye style={{ width: "16px", height: "16px" }} />
                      </motion.button>
                    </Link>

                    <Link href={`/leads/${lead._id}/edit`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          padding: "8px 10px",
                          borderRadius: "6px",
                          backgroundColor: "rgba(217, 119, 6, 0.1)",
                          border: "1px solid rgba(217, 119, 6, 0.2)",
                          color: "#d97706",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(217, 119, 6, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(217, 119, 6, 0.1)";
                        }}
                      >
                        <HiPencil style={{ width: "16px", height: "16px" }} />
                      </motion.button>
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(lead._id)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: "6px",
                        backgroundColor: "rgba(220, 38, 38, 0.1)",
                        border: "1px solid rgba(220, 38, 38, 0.2)",
                        color: "#dc2626",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(220, 38, 38, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(220, 38, 38, 0.1)";
                      }}
                    >
                      <HiTrash style={{ width: "16px", height: "16px" }} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "48px 0",
          }}
        >
          <p style={{ color: "#6b7280", fontSize: "14px" }}>No leads found</p>
        </div>
      )}
    </motion.div>
  );
}
