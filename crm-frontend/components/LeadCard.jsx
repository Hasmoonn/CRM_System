"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { SOURCE_ICONS } from "@/utils/constants";
import {
  HiUser,
  HiOfficeBuilding,
  HiCurrencyDollar,
  HiArrowRight,
} from "react-icons/hi";

export default function LeadCard({ lead, index }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={!isMobile ? { y: -4, transition: { duration: 0.2 } } : {}}
    >
      <Link href={`/leads/${lead._id}`}>
        <motion.div
          style={{
            borderRadius: "12px",
            padding: "clamp(12px, 4vw, 20px)",
            backgroundColor: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "2px solid rgba(226, 232, 240, 0.7)",
            boxShadow:
              "0 4px 24px -4px rgba(0,0,0,0.06), 0 2px 12px -4px rgba(0,0,0,0.03)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative",
            overflow: "hidden",
            group: "group",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(5, 150, 105, 0.3)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px -4px rgba(5, 150, 105, 0.12), 0 4px 16px -4px rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.7)";
            e.currentTarget.style.boxShadow =
              "0 4px 24px -4px rgba(0,0,0,0.06), 0 2px 12px -4px rgba(0,0,0,0.03)";
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(5,150,105,0.3), transparent)",
            }}
          />

          {/* Header: Name and Status */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "clamp(12px, 3vw, 16px)",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(8px, 2vw, 12px)",
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: "clamp(36px, 8vw, 42px)",
                  height: "clamp(36px, 8vw, 42px)",
                  minWidth: "clamp(36px, 8vw, 42px)",
                  borderRadius: "10px",
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
                    fontSize: "clamp(12px, 3vw, 14px)",
                    fontWeight: 700,
                    color: "#059669",
                  }}
                >
                  {lead.leadName?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <h3
                  style={{
                    fontSize: "clamp(13px, 3.5vw, 14px)",
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: "2px",
                    transition: "color 0.2s ease",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={lead.leadName}
                >
                  {lead.leadName}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(11px, 2.5vw, 12px)",
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={lead.companyName}
                >
                  <HiOfficeBuilding
                    style={{ width: "12px", height: "12px", minWidth: "12px" }}
                  />
                  {lead.companyName}
                </p>
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <StatusBadge status={lead.status} />
            </div>
          </div>

          {/* Details Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(8px, 2vw, 10px)",
              marginBottom: "clamp(10px, 3vw, 14px)",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(6px, 1.5vw, 8px)",
                fontSize: "clamp(11px, 2.5vw, 12px)",
                color: "#6b7280",
                minHeight: "20px",
              }}
            >
              <HiUser
                style={{
                  width: "14px",
                  height: "14px",
                  minWidth: "14px",
                  color: "#059669",
                }}
              />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={lead.assignedSalesperson}
              >
                {lead.assignedSalesperson}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(6px, 1.5vw, 8px)",
                fontSize: "clamp(11px, 2.5vw, 12px)",
                fontWeight: 600,
                color: "#059669",
                minHeight: "20px",
              }}
            >
              <HiCurrencyDollar
                style={{ width: "14px", height: "14px", minWidth: "14px" }}
              />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                RS.{lead.estimatedDealValue?.toLocaleString() || 0}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(6px, 1.5vw, 8px)",
                fontSize: "clamp(11px, 2.5vw, 12px)",
                color: "#9ca3af",
                minHeight: "20px",
              }}
            >
              <span style={{ fontSize: "clamp(12px, 3vw, 14px)" }}>
                {SOURCE_ICONS[lead.leadSource] || "📋"}
              </span>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={lead.leadSource}
              >
                {lead.leadSource}
              </span>
            </div>
          </div>

          {/* Footer: Date and CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "clamp(10px, 2.5vw, 12px)",
              borderTop: "1px solid rgba(226, 232, 240, 0.7)",
              gap: "clamp(8px, 2vw, 12px)",
              flexWrap: "wrap",
              marginTop: "auto",
              minHeight: "32px",
            }}
          >
            <span
              style={{
                fontSize: "clamp(10px, 2.2vw, 11px)",
                color: "#d1d5db",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {new Date(lead.createdAt).toLocaleDateString()}
            </span>
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(2px, 1vw, 4px)",
                fontSize: "clamp(11px, 2.5vw, 12px)",
                color: "#059669",
                fontWeight: 600,
                whiteSpace: "nowrap",
                minHeight: "20px",
              }}
              whileHover={!isMobile ? { x: 4 } : {}}
            >
              View Details
              <HiArrowRight
                style={{ width: "12px", height: "12px", minWidth: "12px" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
