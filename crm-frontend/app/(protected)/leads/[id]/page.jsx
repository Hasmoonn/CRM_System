"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { leadsAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import StatusBadge from "@/components/StatusBadge";
import NoteSection from "@/components/NoteSection";
import AnimatedPage from "@/components/AnimatedPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import Link from "next/link";
import { LEAD_STATUSES, SOURCE_ICONS } from "@/utils/constants";
import {
  HiPencil,
  HiTrash,
  HiMail,
  HiPhone,
  HiOfficeBuilding,
  HiUser,
  HiCurrencyDollar,
  HiCalendar,
  HiArrowLeft,
  HiChartBar,
} from "react-icons/hi";

// ── Status color map ────────────────────────────────────
const STATUS_COLORS = {
  New: {
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
    dot: "#3b82f6",
    text: "#3b82f6",
  },
  Contacted: {
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    dot: "#f59e0b",
    text: "#f59e0b",
  },
  Qualified: {
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    dot: "#8b5cf6",
    text: "#8b5cf6",
  },
  "Proposal Sent": {
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.2)",
    dot: "#06b6d4",
    text: "#06b6d4",
  },
  Won: {
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.2)",
    dot: "#059669",
    text: "#059669",
  },
  Lost: {
    bg: "rgba(220,38,38,0.08)",
    border: "rgba(220,38,38,0.2)",
    dot: "#dc2626",
    text: "#dc2626",
  },
};

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const response = await leadsAPI.getById(id);
      setLead(response.data);
    } catch {
      toast.error("Lead not found");
      router.push("/leads");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await leadsAPI.updateStatus(id, newStatus);
      setLead((prev) => ({ ...prev, status: newStatus }));
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await leadsAPI.delete(id);
      toast.success("Lead deleted!");
      router.push("/leads");
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!lead) return null;

  const statusColor = STATUS_COLORS[lead.status] || STATUS_COLORS["New"];

  return (
    <AnimatedPage>
      <Navbar title="Lead Details" />

      <div style={{ padding: "clamp(14px, 4vw, 28px) clamp(16px, 5vw, 32px)" }}>
        {/* ── Back Button ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginBottom: "24px" }}
        >
          <Link href="/leads" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "2px solid rgba(226,232,240,0.7)",
                color: "#6b7280",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#059669";
                e.currentTarget.style.borderColor = "rgba(5,150,105,0.3)";
                e.currentTarget.style.backgroundColor = "rgba(5,150,105,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6b7280";
                e.currentTarget.style.borderColor = "rgba(226,232,240,0.7)";
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.88)";
              }}
            >
              <HiArrowLeft style={{ width: "15px", height: "15px" }} />
              Back to Leads
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "28px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: "#059669",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#059669",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              Lead Profile
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Noto Serif', Georgia, serif",
              fontSize: "28px",
              fontWeight: 600,
              color: "#111827",
              letterSpacing: "-0.01em",
              marginBottom: "4px",
            }}
          >
            {lead.leadName}
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "#9ca3af",
              fontWeight: 500,
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            {lead.companyName} · Added{" "}
            {new Date(lead.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* ── LEFT COLUMN ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                borderRadius: "14px",
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "2px solid rgba(226,232,240,0.7)",
                boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06)",
                padding: "28px",
              }}
            >
              {/* Top row: avatar + name + action buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg, rgba(5,150,105,0.15), rgba(124,58,237,0.15))",
                      border: "2px solid rgba(5,150,105,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#059669",
                      }}
                    >
                      {lead.leadName?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#111827",
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        marginBottom: "4px",
                      }}
                    >
                      {lead.leadName}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <HiOfficeBuilding
                        style={{
                          width: "13px",
                          height: "13px",
                          color: "#9ca3af",
                        }}
                      />
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>
                        {lead.companyName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Link href={`/leads/${id}/edit`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(217,119,6,0.08)",
                        border: "1.5px solid rgba(217,119,6,0.2)",
                        color: "#d97706",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 600,
                        fontFamily:
                          "'Plus Jakarta Sans', system-ui, sans-serif",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(217,119,6,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(217,119,6,0.08)";
                      }}
                    >
                      <HiPencil style={{ width: "15px", height: "15px" }} />
                      Edit
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(220,38,38,0.08)",
                      border: "1.5px solid rgba(220,38,38,0.2)",
                      color: "#dc2626",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(220,38,38,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(220,38,38,0.08)";
                    }}
                  >
                    <HiTrash style={{ width: "15px", height: "15px" }} />
                    Delete
                  </motion.button>
                </div>
              </div>

              {/* Details Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {[
                  { icon: <HiMail />, label: "Email", value: lead.email },
                  { icon: <HiPhone />, label: "Phone", value: lead.phone },
                  {
                    icon: <HiUser />,
                    label: "Salesperson",
                    value: lead.assignedSalesperson,
                  },
                  {
                    icon: <HiCurrencyDollar />,
                    label: "Deal Value",
                    value: `Rs. ${lead.estimatedDealValue?.toLocaleString() || 0}`,
                    highlight: true,
                  },
                  {
                    icon: (
                      <span style={{ fontSize: "14px" }}>
                        {SOURCE_ICONS?.[lead.leadSource] || "🔗"}
                      </span>
                    ),
                    label: "Lead Source",
                    value: lead.leadSource,
                  },
                  {
                    icon: <HiCalendar />,
                    label: "Created",
                    value: new Date(lead.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    ),
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      borderRadius: "10px",
                      backgroundColor: item.highlight
                        ? "rgba(5,150,105,0.05)"
                        : "rgba(248,250,252,0.8)",
                      border: item.highlight
                        ? "1.5px solid rgba(5,150,105,0.15)"
                        : "1.5px solid rgba(226,232,240,0.6)",
                    }}
                  >
                    <div
                      style={{
                        color: item.highlight ? "#059669" : "#9ca3af",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "16px",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#9ca3af",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          fontWeight: 600,
                          marginBottom: "3px",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: item.highlight ? "#059669" : "#111827",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Notes Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <NoteSection leadId={id} />
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Current Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{
                borderRadius: "14px",
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "2px solid rgba(226,232,240,0.7)",
                boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06)",
                padding: "22px",
              }}
            >
              {/* Section label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "1px",
                    backgroundColor: "#059669",
                  }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#059669",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  }}
                >
                  Current Status
                </span>
              </div>

              {/* Status badge */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  backgroundColor: statusColor.bg,
                  border: `1.5px solid ${statusColor.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: statusColor.dot,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: statusColor.text,
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  }}
                >
                  {lead.status}
                </span>
              </div>

              {/* Last updated */}
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(248,250,252,0.8)",
                  border: "1px solid rgba(226,232,240,0.6)",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    marginBottom: "3px",
                  }}
                >
                  Last Updated
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    fontWeight: 500,
                  }}
                >
                  {new Date(lead.updatedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>

            {/* Update Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                borderRadius: "14px",
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "2px solid rgba(226,232,240,0.7)",
                boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06)",
                padding: "22px",
              }}
            >
              {/* Section label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "1px",
                    backgroundColor: "#059669",
                  }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#059669",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  }}
                >
                  Update Status
                </span>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {LEAD_STATUSES.map((status, i) => {
                  const sc = STATUS_COLORS[status] || STATUS_COLORS["New"];
                  const isActive = lead.status === status;
                  return (
                    <motion.button
                      key={status}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.05 }}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStatusChange(status)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        borderRadius: "9px",
                        border: isActive
                          ? `1.5px solid ${sc.border}`
                          : "1.5px solid transparent",
                        backgroundColor: isActive ? sc.bg : "transparent",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor =
                            "rgba(248,250,252,0.9)";
                          e.currentTarget.style.borderColor =
                            "rgba(226,232,240,0.8)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "transparent";
                        }
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: isActive ? sc.dot : "#d1d5db",
                          flexShrink: 0,
                          transition: "background-color 0.2s ease",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? sc.text : "#6b7280",
                          fontFamily:
                            "'Plus Jakarta Sans', system-ui, sans-serif",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {status}
                      </span>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{
                            marginLeft: "auto",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: sc.text,
                            backgroundColor: sc.bg,
                            border: `1px solid ${sc.border}`,
                            borderRadius: "4px",
                            padding: "2px 6px",
                            fontFamily:
                              "'Plus Jakarta Sans', system-ui, sans-serif",
                          }}
                        >
                          Active
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Deal Value Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(5,150,105,0.08) 0%, rgba(124,58,237,0.06) 100%)",
                border: "2px solid rgba(5,150,105,0.15)",
                padding: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <HiChartBar
                  style={{ width: "14px", height: "14px", color: "#059669" }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#059669",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  }}
                >
                  Deal Value
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Noto Serif', Georgia, serif",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#059669",
                  letterSpacing: "-0.01em",
                }}
              >
                Rs. {lead.estimatedDealValue?.toLocaleString() || 0}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginTop: "4px",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              >
                Estimated pipeline value
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
